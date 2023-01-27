use http::StatusCode;
use serde::{Deserialize, Serialize};
use std::error::Error;
use vercel_lambda::{error::VercelError, lambda, IntoResponse, Request, Response};

#[derive(Deserialize)]
struct ParsedBody {
    test: String,
}

#[derive(Serialize)]
struct Data {
    data: String,
}

fn handler(req: Request) -> Result<impl IntoResponse, VercelError> {
    let body = req.into_body();
    let input: ParsedBody = serde_json::from_slice(&body).unwrap();

    let results = Data { data: input.test };

    let data = serde_json::json!(results);
    let response = Response::builder()
        .status(StatusCode::OK)
        .header("Content-Type", "text/plain")
        .body(data.to_string())
        .expect("Internal Server Error");

    Ok(response)
}

fn main() -> Result<(), Box<dyn Error>> {
    Ok(lambda!(handler))
}
