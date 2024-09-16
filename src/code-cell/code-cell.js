import { 
    ZikoUIElement,
    Flex,
    vSplitter,
    hSplitter
} from "ziko";
import { CodeInput } from "./code-input.js";
import { CodeOutput } from "./code-output.js";
class ZikoCMCodeCell extends ZikoUIElement{
    constructor(){
        super("section", "CodeCell");
        this.input = CodeInput().size("100%");
        this.output = CodeOutput().size("100%");
        this.input.attach(this.output)
                  .onKeyDown(e=>useSuccesifKeys(e,["Shift","Enter"],()=>e.target.run()));
        this.cell = Flex(
            this.input,
            this.output
        ).vertical(0, 0)
        this.output.style({
            margin : "10px",
            padding: "0 30px"
        })
    }
    run(){
        this.input.run();
        return this;
    }
    clearInput(){
        // Not Yet
    }
    clearOutput(){
        this.output.clear();
        return this;
    }
    clear(){
        this.clearInput();
        this.clearOutput();
        return this;
    }
}
// class ZikoCMFlexedCodeCell extends Flex.constructor {
//     constructor(){
//         super("section","CodeCell");
//         this.input = CodeInput();
//         this.output = CodeOutput();
//         mixin(this.__proto__, __ZikoCMCellBuilder__);   
//         this.init()  
//     }
// }
// class ZikoCMHorizontallySplittedCodeCell extends ZikoUIHorizontalSplitter {
//     constructor(){
//         super("section","CodeCell");
//         this.input = CodeInput();
//         this.output = CodeOutput();
//         mixin(this.__proto__, __ZikoCMCellBuilder__);     
//         this.init()
//     }
// }

const CodeCell = () => new ZikoCMCodeCell();
const hSplittedCodeCell = () => new ZikoCMCodeCell();
const vSplittedCodeCell = () => new ZikoCMCodeCell();

export{
    CodeCell,
    hSplittedCodeCell,
    vSplittedCodeCell
}