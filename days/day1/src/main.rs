use std::{env, fs};

fn main() {
    let args: Vec<String> = env::args().collect();
    let filename = &args[1];
    let contents = fs::read_to_string(filename)
        .unwrap_or_else(|_| panic!("Unable to read file '{}'", filename));

    let dataset = parse_file(&contents);

    let part_one_submission = part_one(&dataset);
    let part_two_submission = part_two(&dataset);

    println!("part one: {}", part_one_submission);
    println!("part two: {}", part_two_submission);
}

fn parse_file(file_contents: &str) -> Vec<u32> {
    file_contents
        .split("\n\n")
        .collect::<Vec<&str>>()
        .iter_mut()
        .map(|e| {
            e.split('\n')
                .collect::<Vec<&str>>()
                .iter_mut()
                .map(|c| {
                    if c.is_empty() {
                        0
                    } else {
                        c.parse::<u32>().unwrap()
                    }
                })
                .sum()
        })
        .collect::<Vec<u32>>()
}

fn part_one(dataset: &Vec<u32>) -> u32 {
    let mut max = 0;
    for elf in dataset {
        if elf > &max {
            max = *elf;
        }
    }
    max
}

fn part_two(dataset: &Vec<u32>) -> u32 {
    let mut max_elves: [u32; 3] = [0, 0, 0];

    for i in 0..3 {
        for elf in dataset {
            let val_already_present = max_elves[..i].contains(elf);
            if *elf > max_elves[i] && !val_already_present {
                max_elves[i] = *elf;
            }
        }
    }

    let mut total = 0;
    for elf in max_elves {
        total += elf;
    }
    total
}

#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn should_compute_part_one() {
        let dataset = vec![1, 2, 3, 3, 44];
        assert_eq!(part_one(&dataset), 44);
    }

    #[test]
    fn should_compute_part_three() {
        let dataset = vec![1, 1111, 111111, 1112, 44];
        assert_eq!(part_two(&dataset), 113334);
    }
}
