console.log("Email writer ext-content script loaded");

function createAiBtn()
{
    const aiButton=document.createElement("div");
    aiButton.className='T-I J-J5-Ji aoO v7 T-I-atl L3';
    aiButton.style.marginRight="8px";
    aiButton.innerHTML="AI Reply";
    aiButton.setAttribute("role","button");
    aiButton.setAttribute("data-tooltip","Generate AI reply")
    return aiButton;

}

function getEmailContent()
{
   const selectors = [
        '.h7',
        '.a3s.aiL',
        '.gmail_quote',
        '[role="presentation"]'
    ];
    for (const selector of selectors) {
        const content = document.querySelector(selector);
        if (content) {
            return content.innerText.trim();
        }
        return '';
    }
}

function composeToolbar()
{
      const selectors = [
        '.btC',
        '.aDh',
        '[role="toolbar"]',
        '.gU.Up'
    ];

    for(const selector of selectors)
    {
        const toolbar=document.querySelector(selector)
        if(toolbar)
        {
            return toolbar;
        }
    }

    return null;
}

function injectButton()
{
    const button=document.querySelector(".ai-reply-btn");
    if(button)
    {
        button.remove();
    }

    const toolbar=composeToolbar();
    if(!toolbar)
    {
        console.log("toolbar not found")
        return;
    };

    let aiButton=createAiBtn()

    aiButton.classList.add("ai-reply-btn");
    aiButton.addEventListener("click", async ()=>{

      

        try{

            aiButton.innerHTML="Generating..."
            aiButton.disabled=true;
            let emailContent=getEmailContent();

            const response=await fetch("http://localhost:8080/api/email/generate",
                {
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({
                        emailContent:emailContent,
                        tone:"proffesional"
                    })
                }
            )

            if(!response.ok)
            {
                console.log("API response failed");
                return;
            }

            let generatedReply=await response.text();
            console.log(generatedReply)
            const composeBox=document.querySelector('[role="textbox"][g_editable="true"]');

            if(composeBox)
            {
                composeBox.focus();
                document.execCommand('insertText', false, generatedReply);
            }
            else 
            {
                console.log("compose box not found")
            }


        }catch(error)
        {

             console.error(error);
            alert('Failed to generate reply');
        }
        finally{
             aiButton.innerHTML = 'AI Reply';
            aiButton.disabled =  false;
        }

    })

    toolbar.insertBefore(aiButton, toolbar.firstChild);


}

const observer= new MutationObserver((mutations)=>{
    for(const mutation of mutations)
    {
        const addedNodes=Array.from(mutation.addedNodes);
        const hashComposedElements=addedNodes.some(node=>
            node.nodeType=== Node.ELEMENT_NODE &&
            (node.matches('.aDh, .btC, [role="dialog"]') || node.querySelector('.aDh, .btC, [role="dialog"]'))
        );


        if(hashComposedElements){
            console.log("compose window detected");
            setTimeout(injectButton, 500);

        }


    }
})

observer.observe(document.body,{
    childList:true,
    subtree:true
})