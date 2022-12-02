use std::{env, fs};

fn main() {
    let args: Vec<String> = env::args().collect();
    let filename = &args[1];
    let contents = fs::read_to_string(filename)
        .unwrap_or_else(|_| panic!("Unable to read file '{}'", filename));

    let parsed_data = parse_file(contents);

    let part_one_result = part_one(&parsed_data);
    let part_two_result = part_two(&parsed_data);

    println!("part one: {}", part_one_result);
    println!("part two: {}", part_two_result);
}

#[derive(Debug)]
enum RPS {
    Rock,
    Paper,
    Scissors,
}

#[derive(Debug)]
enum GameResult {
    Win,
    Lose,
    Draw,
}

fn rps_to_enum(rps: &str) -> RPS {
    match rps {
        "A" | "X" => RPS::Rock,
        "B" | "Y" => RPS::Paper,
        "C" | "Z" => RPS::Scissors,
        _ => panic!("Unexpected symbol: {}", rps),
    }
}

fn rps_to_aim(rps: &RPS) -> GameResult {
    match rps {
        RPS::Rock => GameResult::Lose,
        RPS::Paper => GameResult::Draw,
        RPS::Scissors => GameResult::Win,
    }
}

fn find_rps_for_result(their_play: &RPS, result: &GameResult) -> RPS {
    let game = (their_play, result);
    match game {
        (RPS::Rock, GameResult::Win) => RPS::Paper,
        (RPS::Rock, GameResult::Draw) => RPS::Rock,
        (RPS::Rock, GameResult::Lose) => RPS::Scissors,
        
        (RPS::Paper, GameResult::Win) => RPS::Scissors,
        (RPS::Paper, GameResult::Draw) => RPS::Paper,
        (RPS::Paper, GameResult::Lose) => RPS::Rock,
        
        (RPS::Scissors, GameResult::Win) => RPS::Rock,
        (RPS::Scissors, GameResult::Draw) => RPS::Scissors,
        (RPS::Scissors, GameResult::Lose) => RPS::Paper,
    }
        
}

/// check if the game is won for personA
fn is_game_won(person_a: &RPS, person_b: &RPS) -> GameResult {
    let game = [person_a, person_b];
    match game {
        [RPS::Rock, RPS::Rock] => GameResult::Draw,
        [RPS::Rock, RPS::Paper] => GameResult::Lose,
        [RPS::Rock, RPS::Scissors] => GameResult::Win,
        
        [RPS::Paper, RPS::Paper] => GameResult::Draw,
        [RPS::Paper, RPS::Scissors] => GameResult::Lose,
        [RPS::Paper, RPS::Rock] => GameResult::Win,
        
        [RPS::Scissors, RPS::Scissors] => GameResult::Draw,
        [RPS::Scissors, RPS::Rock] => GameResult::Lose,
        [RPS::Scissors, RPS::Paper] => GameResult::Win,
    }

}

fn rps_to_points(rps: &RPS) -> u32 {
    match rps {
        RPS::Rock => 1,
        RPS::Paper => 2,
        RPS::Scissors => 3,
    }
}

fn game_result_to_points(result: &GameResult) -> u32 {
    match result {
        GameResult::Win => 6,
        GameResult::Draw => 3,
        GameResult::Lose => 0,
    }
}

fn parse_file(file: String) -> Vec<Vec<RPS>> {
    file.split('\n')
        .collect::<Vec<&str>>()
        .iter_mut()
        .filter(|e| !e.is_empty())
        .map(|e| {
            e.split(' ')
                .collect::<Vec<&str>>()
                .iter_mut()
                .map(|c| rps_to_enum(c))
                .collect::<Vec<RPS>>()
        })
        .collect::<Vec<Vec<RPS>>>()
}

fn part_one(game_strategy: &Vec<Vec<RPS>>) -> u32 {
    let mut total = 0;
    for game in game_strategy {
        let hand_points = rps_to_points(&game[1]);
        let game_result = is_game_won(&game[1], &game[0]);
        //println!("line: {:?}, result: {:?}", game, game_result);
        let game_results_points = game_result_to_points(&game_result);
        total += hand_points + game_results_points;
    }

    total
}

fn part_two(game_strategy: &Vec<Vec<RPS>>) -> u32 {
    let mut total = 0;

    for game in game_strategy {
        let preferred_outcome = rps_to_aim(&game[1]);
        let needed_rps = find_rps_for_result(&game[0], &preferred_outcome);

        let rps_points = rps_to_points(&needed_rps);
        let preferred_outcome_points = game_result_to_points(&preferred_outcome);

        total += rps_points + preferred_outcome_points;
    }

    total
}


#[cfg(test)]
mod day_two_tests {
    #[test]
    fn it() {}
}
