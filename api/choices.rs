use http::StatusCode;
use std::error::Error;
use vercel_lambda::{error::VercelError, lambda, IntoResponse, Request, Response};

pub mod calculations;

fn handler(req: Request) -> Result<impl IntoResponse, VercelError> {
    let body = req.into_body();
    let input = serde_json::from_slice(&body);

    match input {
        Ok(input) => {
            let results = calculations::main(&input).unwrap();

            let data = serde_json::json!(results);
            let response = Response::builder()
                .status(StatusCode::OK)
                .header("Content-Type", "text/plain")
                .body(data.to_string())
                .expect("Internal Server Error");

            Ok(response)
        }
        Err(e) => {
            let error = format!("Error: {}", e);
            Ok(Response::builder()
                .status(StatusCode::BAD_REQUEST)
                .body(error)
                .unwrap())
        }
    }
}

fn main() -> Result<(), Box<dyn Error>> {
    Ok(lambda!(handler))
}
