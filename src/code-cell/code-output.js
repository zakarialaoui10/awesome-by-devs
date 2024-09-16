import { 
    ZikoUIElement,
    text
 } from "ziko";

class ZikoCMCodeOutput extends ZikoUIElement{
    constructor(){
        super("output", "CodeOutput");
        Object.assign(this.cache,{
            state : null
        });
        this.style({
            display : "block",
            // boxSizing : "border-box",
            // padding : "5px",
        })
    }
    get isCodeOutput(){
        return true;
    }
    attach(Input){
        Input.attach(this);
        return this;
    }
    detach(){
        this.cache.attachedInput.detach(this);
        return this;
    }
    eval(CodeInput){
        const code = CodeInput.codeContent;
        this.clear();
        globalThis?.__Ziko__?.__Config__?.setDefault({
            target : this.element
        })
        this.#evaluateJs(code)
        return this
    }
    clear(){
        Object.assign(this.element,{
            innerHTML : ""
        })
        return this;
    }
    #evaluateJs(code, order){
        try{
            // this.LeftControl[0].setValue("pending");
            this.cache.state="pending";  
            // globalThis.eval(this.Input.element.innerText);
            globalThis?.eval(code);

        }
        catch(err){
            console.log(err)
            text(`Error : ${err.message}`).style({
                color:"red",
                background:"gold",
                border:"2px red solid",
                padding:"10px",
                margin:"10px 0",
                display:"flex",
                justifyContent: "center",
            });
            // this.LeftControl[0].setValue("Err");
            this.cache.state="Error";            
        }
        finally{
            if(this.cache.state==="pending"){
                this.cache.state="success";
                // this.setOrder(order);
                // if(this.cache.parent instanceof ZikoUICodeNote){
                //     this.cache.parent.incrementOrder();
                //     this.cache.parent.next();
                // }
            }
        }
    }

}


const CodeOutput = () => new ZikoCMCodeOutput();

export{
    CodeOutput,
    ZikoCMCodeOutput
}