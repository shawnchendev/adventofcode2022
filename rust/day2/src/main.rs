use std::collections::HashMap;
use std::fs::File;
use std::io::{prelude::*, BufReader};
use std::path::Path;

fn read_from_files(file_path: impl AsRef<Path>) -> Vec<String> {
    let file = File::open(file_path).expect("file does not exist");
    let reader = BufReader::new(file);
    reader.lines().map(|l| l.unwrap()).collect()
}

fn main() {
    let win_scores: HashMap<&str, i32> = HashMap::from([("X", 1), ("Y", 2), ("Z", 3)]);
    let scores: HashMap<&str, i32> = HashMap::from([("WIN", 6), ("LOST", 0), ("DRAW", 3)]);
    let game_states: HashMap<&str, &str> = HashMap::from([
        ("A X", "DRAW"),
        ("A Y", "WIN"),
        ("A Z", "LOST"),
        ("B X", "LOST"),
        ("B Y", "DRAW"),
        ("B Z", "WIN"),
        ("C X", "WIN"),
        ("C Y", "LOST"),
        ("C Z", "DRAW"),
    ]);
    let mut total = 0;
    let lines = read_from_files("./src/input.txt");
    for line in lines {
        let (_, b) = line.split_once(" ").unwrap();
        let game_state = game_states.get(line.as_str()).unwrap();
        let score = scores.get(game_state).unwrap();
        let win_score = win_scores.get(b).unwrap();
        let b_score = score + win_score;
        total += b_score;
    }
    println!("{}", total);
}
