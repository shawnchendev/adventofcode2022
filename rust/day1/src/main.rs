use std::fs::File;
use std::io::{self, prelude::*, BufReader};
use std::path::Path;

fn read_from_files(file_path: impl AsRef<Path>) -> Vec<String> {
    let file = File::open(file_path).expect("file does not exist");
    let reader = BufReader::new(file);
    reader.lines().map(|l| l.unwrap()).collect()
}
fn main() -> io::Result<()> {
    let lines = read_from_files("./src/input.txt");
    let mut sums: Vec<i32> = Vec::new();
    let mut sum = 0;
    for line in lines {
        if line == "" {
            sums.push(sum);
            sum = 0;
            continue;
        }
        let num: i32 = line.parse().unwrap();
        sum += num;
    }
    sums.sort_by(|a, b| b.cmp(a));
    println!("Part 1 Top 1: {:?}", sums[0]);

    let mut top_3_elves = 0;

    for key in 0..3 {
        top_3_elves += sums[key];
    }
    println!("Part 2 Top 3 elf: {:?}", top_3_elves);

    Ok(())
}
