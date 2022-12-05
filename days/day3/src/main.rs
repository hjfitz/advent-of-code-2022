use std::{env, fs, time::Instant};

fn main() {
    let args: Vec<String> = env::args().collect();
    let filename = &args[1];

    let contents = fs::read_to_string(filename)
        .unwrap_or_else(|_| panic!("Unable to read file '{}'", filename));

    let dataset = parse_file(contents.clone());

    let part_one_begin = Instant::now();
    let part_one_result = part_one(&dataset);
    let after_part_one = Instant::now().duration_since(part_one_begin);

    let part_two_begin = Instant::now();
    let part_two_result = part_two(&contents);
    let after_part_two = Instant::now().duration_since(part_two_begin);

    println!(
        "Part one: {} (took: {}us)",
        part_one_result,
        after_part_one.as_micros(),
    );

    println!(
        "Part two: {} (took {}us)",
        part_two_result,
        after_part_two.as_micros()
    );
}

type Dataset = Vec<(Vec<char>, Vec<char>)>;

fn parse_file(contents: String) -> Dataset {
    contents
        .split('\n')
        .filter_map(|l| {
            if l.is_empty() {
                None
            } else {
                Some(parse_line(l))
            }
        })
        .collect()
}

fn parse_line(line: &str) -> (Vec<char>, Vec<char>) {
    let len = line.len();
    let halfway_point = len / 2;

    let first_half = line.chars().take(halfway_point).collect::<Vec<char>>();
    let second_half = line
        .chars()
        .skip(halfway_point)
        .take(len)
        .collect::<Vec<char>>();

    (first_half, second_half)
}

fn part_one(data: &Dataset) -> usize {
    let mut total = 0;
    for line in data {
        '_search: for ch in &line.0 {
            if line.1.contains(ch) {
                let val = get_value_for_char(ch);
                total += val;
                break '_search;
            }
        }
    }

    total
}

fn part_two(raw_contents: &str) -> usize {
    let lines = raw_contents
        .split('\n')
        .filter(|l| !l.is_empty())
        .collect::<Vec<_>>();

    let mut total = 0;

    for l in lines.chunks(3) {
        let (l1, l2, l3) = if let [l1, l2, l3] = l {
            (l1, l2, l3)
        } else {
            (&"", &"", &"")
        };
        // let name = find_group_name((l1, l2, l3));
        // let val = get_value_for_char(&name);
        let val = find_group_value(vec![l1, l2, l3]);
        total += val;
    }

    total
}

fn _find_group_name(groups: (&str, &str, &str)) -> char {
    let name = ' ';

    for chr_1 in groups.0.chars() {
        for chr_2 in groups.1.chars() {
            for chr_3 in groups.2.chars() {
                if chr_1 == chr_2 && chr_1 == chr_3 {
                    return chr_1;
                }
            }
        }
    }

    name
}

fn find_group_value(groups: Vec<&str>) -> usize {
    let mut matrix: [[usize; 53]; 3] = [[0; 53]; 3];

    for (i, group) in matrix.iter_mut().enumerate() {
        for chr in groups.get(i).unwrap().chars() {
            let chr_val = get_value_for_char(&chr) as usize;
            let pos = &mut group[chr_val];
            if *pos == 0 {
                *pos = i + 1;
            }
        }
    }

    let results = matrix[0]
        .iter()
        .zip(matrix[1].iter().zip(matrix[2].iter()).collect::<Vec<_>>())
        .position(|l| l == (&1, (&2, &3))); // could have easily done something like true,true,true
                                            // or 1,1,1

    results.unwrap_or(0) 
}

fn get_value_for_char(c: &char) -> usize {
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
        'u' => 21,
        'v' => 22,
        'w' => 23,
        'x' => 24,
        'y' => 25,
        'z' => 26,
        'A' => 27,
        'B' => 28,
        'C' => 29,
        'D' => 30,
        'E' => 31,
        'F' => 32,
        'G' => 33,
        'H' => 34,
        'I' => 35,
        'J' => 36,
        'K' => 37,
        'L' => 38,
        'M' => 39,
        'N' => 40,
        'O' => 41,
        'P' => 42,
        'Q' => 43,
        'R' => 44,
        'S' => 45,
        'T' => 46,
        'U' => 47,
        'V' => 48,
        'W' => 49,
        'X' => 50,
        'Y' => 51,
        'Z' => 52,
        _ => panic!("Unable to convert '{}'", c),
    }
}
