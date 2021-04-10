class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    question.hide();
  background("yellow");
  var resultTitle = createElement("h1");
  resultTitle.html("RESULTS");
  resultTitle.position(100,10);
  Contestant.getPlayerInfo();
  if(allContestants !== undefined){
    var display_pos = 230;
    var correctAnswer = "2";
    for(var ppl in allContestants){
      if (correctAnswer === allContestants[ppl].answer)
        fill("green");
      else
        fill("black");
        display_pos +=30 
      textSize(20);
      text(allContestants[ppl].name + ": " + allContestants[ppl].answer, 220,display_pos);
    }
  }
}

}
