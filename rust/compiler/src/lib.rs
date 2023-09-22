use wasm_bindgen::prelude::*;
#[cfg(target_arch = "wasm32")]
use web_sys::console;
mod utils;

use leo_errors::emitter::Handler;
use leo_span::symbol::create_session_if_not_set_then;

use crate::utils::set_panic_hook;

// mod compile;
mod compiler;
// pub mod mycompiler;
mod options;

#[wasm_bindgen]
pub fn compile(program_string: String, program_name: String) -> String {
    // compile_a_program(program_string, program_name)
    create_session_if_not_set_then(|_| compile_a_program(program_string, program_name))
}

fn compile_a_program(program_string: String, program_name: String) -> String {

    set_panic_hook();
    let binding = Handler::default();


    let mut mycompiler =
        compiler::Compiler::new(program_name, "testnet3".to_string(), &binding, None);
    let (_, instructions) = mycompiler.compile(program_string).unwrap();

    return instructions;
}


