const quoteContainer = document.getElementById("quote-container")
const quoteText = document.getElementById("quote")
const authorText = document.getElementById("author")
const twitterBtn = document.getElementById("twitter")
const newQuoteBtn = document.getElementById("new-quote")
const loader = document.getElementById("loader")

//Show loading
const loading = () => {
    loader.hidden = false
    quoteContainer.hidden = true
}

const isComplete = () => {
    if (!loader.hidden){
        loader.hidden = true
        quoteContainer.hidden = false
    }
}


//Get Quote from api
const getQuote = async () => {
    //the herokuapp link is a free to use app to disable cors   
    try{
        loading()
        //there are 1623 quotes apparently        
        const apiUrl = `http://api.quotable.io/random`
        const response = await fetch(apiUrl)
        const data = await response.json()
        data.author==='' ?
            authorText.innerText = "Unknown" :
            authorText.innerText = data.author

        data.content.length > 100 ?
            quoteText.classList.add("long-quote") :
            quoteText.classList.remove("long-quote")
        
        quoteText.innerText = data.content 
        isComplete()
    }
    catch(error){
        console.log("no quote for ye m8 but ",error)
    }
}

const tweetFunction = () =>{
    const author = authorText.innerText
    const quote = quoteText.innerText
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`
    window.open(twitterUrl,'_blank')
}

//Event Listeneres
newQuoteBtn.addEventListener('click',getQuote)
twitterBtn.addEventListener('click',tweetFunction)


// getQuote()

getQuote()
