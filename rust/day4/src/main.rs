use std::collections::HashMap;
use std::fs::File;
use std::io::{prelude::*, BufReader};
use std::path::Path;

fn read_from_files(file_path: impl AsRef<Path>) -> Vec<String> {
    let file = File::open(file_path).expect("file does not exist");
    let reader = BufReader::new(file);
    reader.lines().map(|l| l.unwrap()).collect()
}

fn parse_line(line: &str) -> HashMap<&str, Vec<String>> {
    let number_pair = line.split(",").collect::<Vec<&str>>();
    let pair_one = number_pair[0].split("-").map(|x| x.to_string()).collect();
    let pair_two = number_pair[1].split("-").map(|x| x.to_string()).collect();
    let mut pairs = HashMap::new();
    pairs.insert("first", pair_one);
    pairs.insert("second", pair_two);
    pairs
}

fn main() {
    let lines = read_from_files("./src/input.txt");
    let mut fully_contain_result: i32 = 0;
    let mut partially_contain_result: i32 = 0;
    for line in lines {
        let parsed_line = parse_line(&line);
        let first = parsed_line.get("first").unwrap();
        let second = parsed_line.get("second").unwrap();
        let first_number_one = first[0].parse::<i32>().unwrap();
        let first_number_two = first[1].parse::<i32>().unwrap();
        let second_number_one = second[0].parse::<i32>().unwrap();
        let second_number_two = second[1].parse::<i32>().unwrap();

        if first_number_one <= second_number_one && first_number_two >= second_number_two
            || second_number_one <= first_number_one && second_number_two >= first_number_two
        {
            fully_contain_result += 1;
        }

        if first_number_one >= second_number_two && first_number_one <= second_number_two
            || first_number_two <= second_number_two && first_number_two >= second_number_one
            || second_number_one >= first_number_one && second_number_one <= first_number_two
            || second_number_two <= first_number_two && second_number_two >= first_number_one
        {
            partially_contain_result += 1;
        }
    }
    println!("fully_contain_result:{}", fully_contain_result);
    println!("partially_contain_result:{}", partially_contain_result);
}
