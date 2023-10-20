
export class Question {
  static create(question) {
    return fetch(
      "https://podcast-app-6e505-default-rtdb.europe-west1.firebasedatabase.app/questions.json",
      {
        method: "POST",
        body: JSON.stringify(question),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((response) => {
        question.id=response.name;
        return question
    
      })
      .then(addToLocalStorage)
      .then(Question.renderList)
      
  }

  static fetch(token){
    if(!token){
      return Promise.resolve({error: 'У вас нет токена'})
    }
    return fetch(`https://podcast-app-6e505-default-rtdb.europe-west1.firebasedatabase.app/questions.json?auth=${token}`)
    .then(response=>response.json())
    .then(questions=>{console.log('Questions',questions)})
  }

  static renderList(){
    const questions=getQuestionsFromLocalStorage()
    const html = questions.length 
    ? questions.map(toCard).join('') 
    : '<div class="mui--text-headline">Вы пока ничего не спрашивали</div>';
      
    const list=document.getElementById('list')

    list.innerHTML=html

  }
}

function addToLocalStorage(question){
  if(question === null || question === undefined){
    console.error('Trying to add null or undefined question to local storage');
    return;
  }
  const all=getQuestionsFromLocalStorage()
  all.push(question)
  localStorage.setItem('questions', JSON.stringify(all))
}

function getQuestionsFromLocalStorage(){
  return JSON.parse(localStorage.getItem('questions')|| '[]')
}

function toCard(question){
  return `
  <div >${new Date(question.date).toLocaleDateString()}
  ${new Date(question.date).toLocaleTimeString()}</div>
  <div class="mui--text-headline">
     ${question.text}
  </div>
  <hr>`
}