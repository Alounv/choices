# Project choice

This is an app to facilitate faire repartition of projects between devs.
It can be tested here: https://project-choices.vercel.app/.

## What

1. Enter the project and their respective storypoints.
2. Put the preferences of each dev in the format `B > A > C`.
3. Click calculate.
4. See the results.

<img width=500 src="https://user-images.githubusercontent.com/34238160/215915269-96ff3162-305c-4103-9ea9-fcdd04e48c4c.png" />

## Rules

```
Next person to choose a project should :
1. have the lowest number of storypoints already assigned
2. in case of equality, have the biggest number of denials
3. in case of equality, be randomly choosen

We add a denial each time the person first choice is taken by someone else who had not less projects than him.
```

## Why

This is a personal project to learn:
- Qwik
- The Rust runtime on vercel

