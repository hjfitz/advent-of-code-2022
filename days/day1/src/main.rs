use std::fs;

fn main() {
    println!("Hello, world!");
    let result = with_highest_calories("./src/real-data");
    println!("got {}", result);
}

fn with_highest_calories(fname: &str) -> usize {
    // read the file
    let contents =
        fs::read_to_string(fname).expect(format!("Unable to read file '{}'", fname).as_str());
    // split by newline, create tuples
    let elves = contents
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
        .collect::<Vec<u32>>();

    //let mut thiccest_elf = 0;
    let mut thiccest_elf_value = 0;
    for (_idx, elf) in elves.iter().enumerate() {
        if elf > &thiccest_elf_value {
            thiccest_elf_value = *elf;
        }
    }

    thiccest_elf_value.try_into().unwrap_or(0)
}
