use std::{env, fs};

fn main() {
    let args: Vec<String> = env::args().collect();
    let filename = &args[1];

    let contents = fs::read_to_string(filename)
        .unwrap_or_else(|_| panic!("Unable to read file '{}'", filename));

    let dataset = parse_file(contents);
    println!("{:?}", &dataset)
}

type Dataset = Vec<(Vec<char>, Vec<char>)>;

fn parse_file(contents: String) -> Dataset {
    contents.split('\n').filter_map(|l| {
        if l.is_empty() {
            None
        } else {
            Some(parse_line(l))
        }
    }).collect()
}

fn parse_line(line: &str) -> (Vec<char>, Vec<char>) {
    let len = line.len();
    let halfway_point = len / 2;

    let first_half = line.chars().take(halfway_point).collect::<Vec<char>>();
    let second_half = line.chars().skip(halfway_point).take(len).collect::<Vec<char>>();

    (first_half, second_half)
}

fn part_one(data: &Dataset) -> u16 {
    let mut total = 0;
    for line in data {
        // iter through the first 
        for ch in &line.0 {
            // if &line.1 contains, get the numerical value and add to total
        }
    }

    total
}

fn get_value_for_char(c: &char) -> u16 {
    if c.is_uppercase() {
        let lower = c.to_lowercase().collect();
        return get_value_for_char(lower) + 26;
    }
    match c {
        'a' => 1,
        'b' => 2,
        'c' => 3,
        'd' => 4,
        'e' => 5,
        'f' => 6,
        'g' => 7,
        'h' => 8,
        'i' => 9,
        'j' => 10,
        'k' => 11,
        'l' => 12,
        'm' => 13,
        'n' => 14,
        'o' => 15,
        'p' => 16,
        'q' => 17,
        'r' => 18,
        's' => 19,
        't' => 20,
        'j' => 21,
        'v' => 22,
        'q' => 23,
        'x' => 24,
        'y' => 25,
        'z' => 26,
        'q' => 27,
        'r' => 28,
        's' => 29,
    }
}
