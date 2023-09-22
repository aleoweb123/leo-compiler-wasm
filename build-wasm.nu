cd rust/compiler
RUSTFLAGS=--cfg=web_sys_unstable_apis cargo build --target wasm32-unknown-unknown --features wasm --release
cd -
wasm-bindgen --out-dir src/wasm --web target/wasm32-unknown-unknown/release/leo_compiler_wasm.wasm
yarn dev