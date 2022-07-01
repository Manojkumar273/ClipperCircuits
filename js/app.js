const instruction = document.getElementById("instruction");
const type = document.getElementById("types");
const verification = document.getElementById("verification");
const check= document.getElementById("check");
const gif = document.getElementById("gif");

let baseValue;
let peakValue;
let typeno=1;

const setType= ()=>{
    typeno = type.value;
    if(typeno==1){
        gif.setAttribute("src","images/positivebias.gif");
    }
    else if(typeno==2){
        gif.setAttribute("src","images/negativebias.gif");
    }
}

const refresh= ()=>{
    location.reload()
}

const setBaseValue = ()=>{
      baseValue=document.getElementById("basevalue").value;
      instruction.innerHTML="To see graph for the selected clipper circuit, click graph button";
}

const setPeakValue = ()=>{
      peakValue=document.getElementById("peakvalue").value;
      instruction.innerHTML="Enter Resistance Value and click set button";
}


const setRvalue = ()=>{
      resistance=document.getElementById("resistance").value;
      if(peakValue<700){
          if(peakValue/resistance<1){
              verification.innerHTML="Your Circuit design is verified."
              check.classList.remove("incrct");
              check.classList.add("verify")
          }
          else{
              verification.innerHTML="Your design is incorrect. Please read the datasheet."
              check.classList.remove("verify");
              check.classList.add("incrct");
          }
      }
      else{
          verification.innerHTML="Your design is incorrect. Please read the datasheet."
          check.classList.remove("verify");
          check.classList.add("incrct");
      }
      instruction.innerHTML="Check whether your circuit design is correct or not. If correct, Enter Base Value and click set button, else, read the datasheet and change the circuit design.";
}

const getValueInput = () =>{

    function calculateSine(degrees) {
        var radians = (Math.PI / 180) * degrees;
        return Math.sin(radians);
    }

    console.log(typeno);

    let sineValues=[];
    let theta=0;
    if(typeno==1){   //for positive clipper, positive clipper flag=1
        for(let i=0;i<13;i++){
            let x= peakValue*calculateSine(theta);
            if(baseValue>=0){
                if(x>baseValue) x=baseValue;
            }
            else{
            if(x<baseValue) x=baseValue; 
            }
            theta+=30;
            sineValues.push(x);
        }
    }else if(typeno==2){ 
       //negative biased clipper, negative clipper flag=2
        for(let i=0;i<13;i++){
            let x= peakValue*calculateSine(theta);
            if(x<baseValue){
                x=baseValue;
            }
            theta+=30;
            sineValues.push(x);
        }
    }

    console.log(sineValues);
    let otherSine = sineValues.slice(1,14);
    sineValues=sineValues.concat(otherSine);
    console.log(sineValues);

    const ctx = document.getElementById("output");
    let chart = new Chart(ctx, {
        type: 'line',
        data: {
            datasets:[{
                label:"OUTPUT",
                lineTension:0.17,
                backgroundColor:"rgba(255, 121, 121,1.0)",
                borderColor:"#2E0249",
                data:sineValues
            }],
            labels:['0','30','60','90','120','150','180','210','240','270','300','330','360','30','60','90','120','150','180','210','240','270','300','330','360']
        },
        options: {
            scales: {
                y: {
                    suggestedMin: -15,
                    suggestedMax: 15
                }
            }
        }
    });

    if(typeno==1){
        instruction.innerHTML="If the input voltage is less than the battery voltage, the diode remains in forward bias and it conducts. Therefore, the signal appears at the output. When the input voltage increases above the battery voltage, the diode becomes reverse-biased and does not conduct the input signal. Therefore, the battery voltage Vb appears at the output";
    }
    else if(typeno==2){
        instruction.innerHTML="During the positive half cycle, the diode is reversed biased due to the input voltage and the negative battery as well. Therefore, in the positive half cycle, the diode does not conduct and only the negative battery voltage appears at the output.During the negative half-cycle, the input voltage polarity reverses and the diode becomes forward biased. However, the diode is reverse biased due to the negative battery. Therefore, the diode only becomes forward biased if the input voltage increases above the battery voltage and the input signal appear at the output. ";
    }
}