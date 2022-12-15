use std::collections::HashMap;
use std::fs::File;
use std::io::{prelude::*, BufReader};
use std::path::Path;

fn read_from_files(file_path: impl AsRef<Path>) -> Vec<String> {
    let file = File::open(file_path).expect("file does not exist");
    let reader = BufReader::new(file);
    reader.lines().map(|l| l.unwrap()).collect()
}

fn parse_line(line: &str) -> HashMap<&str, Vec<i32>> {
    let number_pair = line.split(",").collect::<Vec<&str>>();
    let pair_one = parse_pair(number_pair[0]);
    let pair_two: Vec<i32> = parse_pair(number_pair[1]);
    let mut pairs = HashMap::new();
    pairs.insert("first", pair_one);
    pairs.insert("second", pair_two);
    pairs
}

fn parse_pair(pair: &str) -> Vec<i32> {
    let parsed_pair: Vec<i32> = pair.split("-").map(|x| x.parse::<i32>().unwrap()).collect();
    parsed_pair
}

fn is_fully_contain(first: &Vec<i32>, second: &Vec<i32>) -> bool {
    first[0] <= second[0] && first[1] >= second[1] || second[0] <= first[0] && second[1] >= first[1]
}

fn is_partially_contain(first: &Vec<i32>, second: &Vec<i32>) -> bool {
    first[0] >= second[1] && first[0] <= second[1]
        || first[1] <= second[1] && first[1] >= second[0]
        || second[0] >= first[0] && second[0] <= first[1]
        || second[1] <= first[1] && second[1] >= first[0]
}

fn main() {
    let lines = read_from_files("./src/input.txt");
    let mut fully_contain_result: i32 = 0;
    let mut partially_contain_result: i32 = 0;
    for line in lines {
        let parsed_line = parse_line(&line);
        let first = parsed_line.get("first").unwrap();
        let second = parsed_line.get("second").unwrap();
        if is_fully_contain(first, second) {
            fully_contain_result += 1;
        }

        if is_partially_contain(first, second) {
            partially_contain_result += 1;
        }
    }
    println!("fully_contain_result:{}", fully_contain_result);
    println!("partially_contain_result:{}", partially_contain_result);
}
