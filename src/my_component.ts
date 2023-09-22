
class Mycomponent extends HTMLElement {
    source: string

    static get observedAttributes() { return ["mytext"]; }

    get mytext() {
        return this.getAttribute("mytext");
    }

    constructor() {
        // Always call super first in constructor
        super();
        this.source = `
        // The 'hello' program.
    program hello.aleo {
        transition main(public a: u32, b: u32) -> u32 {
            let c: u32 = a + b;
            return c;
        }
    }`

    }

    async connectedCallback() {
        console.log("connectedCallback")
        this.render()
        document.querySelector('#counter')?.addEventListener('click', async () => await this.run())
        this.addEventListener('input', (event: Event) => {
            const target = event.target as HTMLElement;
            if (target.matches('#textinput')) {
                const newValue = (event.target as HTMLTextAreaElement).value;
                this.source = newValue;
            }
        })
        this.addEventListener('click',(event: Event) => {
            const target = event.target as HTMLElement;
            if (target.matches('#compile-btn')) {
                this.run()
            }
        })
    }

    async run() {
        let m = await import('./wasm/leo_compiler_wasm')
        await m.default()

        const regex = /program\s+([a-z0-9_]+)\.aleo\s+{/gm;
        const match = regex.exec(this.source);

        var program_name = ""
        if (match) {
            program_name = match[1];
        } else {
            alert("cant read program name! only a-z,0-9,_ are allowed")
            return
        }

        this.setAttribute("mytext", m.compile(this.source, program_name))
    }

    attributeChangedCallback(attrName: any, _oldVal: any, _newVal: any) {
        if (attrName == "mytext") {
            const p = this.querySelector('#text')
            if (p){
                p.textContent = this.mytext
            }
        }
    }

    render() {
        this.innerHTML = `
        <textarea id="textinput" style="width:95%; height: 14em">${this.source}</textarea>
        <p/>
        <button id="compile-btn" type="button">compile</button>
        <p id="text" style="white-space: pre-wrap;">${this.mytext}</p>
        `
    }

}

customElements.define('my-component', Mycomponent);
