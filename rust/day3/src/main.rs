use std::char;
use std::collections::HashSet;
use std::fs::File;
use std::io::{prelude::*, BufReader};
use std::path::Path;

fn read_from_files(file_path: impl AsRef<Path>) -> Vec<String> {
    let file = File::open(file_path).expect("file does not exist");
    let reader = BufReader::new(file);
    reader.lines().map(|l| l.unwrap()).collect()
}

fn get_intersection(first: &str, second: &str) -> HashSet<char> {
    let first_set = first.chars().into_iter().collect::<HashSet<char>>();
    let second_set = second.chars().into_iter().collect::<HashSet<char>>();
    first_set
        .intersection(&second_set)
        .cloned()
        .collect::<HashSet<char>>()
}

fn get_intersection_by_group_three(groups: &[String]) -> HashSet<char> {
    let mut first_set = groups[0].chars().into_iter().collect::<HashSet<char>>();
    for line in groups {
        let set = line.chars().into_iter().collect::<HashSet<char>>();
        first_set = first_set
            .intersection(&set)
            .cloned()
            .collect::<HashSet<char>>();
    }
    first_set
}

fn get_digit(char: char) -> u32 {
    let upper_alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let lower_alphabets = "abcdefghijklmnopqrstuvwxyz";
    if char.is_uppercase() {
        upper_alphabets.chars().position(|x| x == char).unwrap() as u32 + 1 + 26
    } else {
        lower_alphabets.chars().position(|x| x == char).unwrap() as u32 + 1
    }
}

fn get_unique_chars_sum(lines: Vec<String>) -> u32 {
    let mut sum: u32 = 0;
    for line in lines {
        if line.trim().is_empty() {
            continue;
        };
        let line_len = line.len();
        let half_len = line_len / 2;
        let first_rucksack = &line[0..half_len];
        let second_rucksack = &line[half_len..];
        for c in get_intersection(first_rucksack, second_rucksack) {
            sum += get_digit(c);
        }
    }
    sum
}

fn get_unique_chars_sum_by_group_three(lines: Vec<String>) -> u32 {
    let mut sum: u32 = 0;
    let line_len = lines.len();
    for i in (0..line_len).step_by(3) {
        let group_three = &lines[i..i + 3];
        for c in get_intersection_by_group_three(group_three) {
            sum += get_digit(c);
        }
    }
    sum
}
fn main() {
    let lines = read_from_files("./src/input.txt");
    let sum: u32 = get_unique_chars_sum(lines.clone());
    println!("Part 1 Sum: {}", sum);

    let sum_group_three: u32 = get_unique_chars_sum_by_group_three(lines.clone());
    println!("Part 2 Sum: {}", sum_group_three);
}
