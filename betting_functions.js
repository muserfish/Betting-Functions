// This function returns the margin for a 3way market like 1x2, Next Goal etc
function Margin3way(homeOdds, drawOdds, awayOdds) {
    marginpercent3way = (100/homeOdds) + (100/drawOdds) + (100/awayOdds)
    return marginpercent3way
}

// This function returns the margin for a 2way market like Over Unders and Draw No Bet etc
function Margin2way(oneOdds, twoOdds) {
    marginpercent2way = (100/oneOdds) + (100/twoOdds);
    return marginpercent2way
}

//converts 2way odds to 100% (true prices)
function toHundred2way(anyOdd){
    anyOddtoHundred = anyOdd * (marginpercent2way/100);
    return anyOddtoHundred
}

//converts 3way odds to 100% (true prices)
function toHundred3way(anyOdd){
    anyOddtoHundred = anyOdd * (marginpercent3way/100);
    return anyOddtoHundred
}

//calculates the total amount of goals expected.
function totalGoals(overOdds) {
    goalsexpected = (2.66 * (100/overOdds))/ 50;
    return goalsexpected
}

//calculate the Draw No Bet Home from 1x2, to be used for expectancy distribution.
function DNBHomeperc(HomeOdds100, AwayOdds100) {
    dnbHome = (100/HomeOdds100) / ((100/HomeOdds100) + (100/AwayOdds100));
    return dnbHome
}

//calculate the Draw No Bet Home from 1x2, to be used for expectancy distribution.
function DNBAwayperc(HomeOdds100, AwayOdds100) {
    dnbAway = (100/AwayOdds100) / ((100/HomeOdds100) + (100/AwayOdds100));
    return dnbAway
}

//Calculate the expectancy for home using above calculations
function homeexpectancy(dnbHome, totalGoals){
    HomeExp = totalGoals * dnbHome;
    return HomeExp
}

//Calculate the expectancy for home using above calculations
function awayexpectancy(dnbAway, totalGoals){
    AwayExp = totalGoals * dnbAway;
    return AwayExp
}

//calculates and fills the boxes with the appropriate values using the above functions
function whenclick (){
    var homeinput = document.getElementById("home").value;
    var drawinput = document.getElementById("draw").value;
    var awayinput = document.getElementById("away").value;
    var underinput = document.getElementById("under2.5").value;
    var overinput = document.getElementById("over2.5").value;
    var currentmargin3 = Margin3way(homeinput, awayinput, drawinput);
    document.getElementById("margin3way").value =  currentmargin3.toFixed(2) + "%";
    var currentmargin2 = Margin2way(underinput, overinput);
    document.getElementById("margin2way").value =  currentmargin2.toFixed(2) + "%";
    var home100 = toHundred3way(homeinput);
    var draw100 = toHundred3way(drawinput);
    var away100 = toHundred3way(awayinput);
    document.getElementById("hometo100").value =  home100.toFixed(2);
    document.getElementById("drawto100").value =  draw100.toFixed(2);
    document.getElementById("awayto100").value =  away100.toFixed(2);
    var under100 = toHundred2way(underinput);
    var over100 = toHundred2way(overinput);
    document.getElementById("underto100").value =  under100.toFixed(2);
    document.getElementById("overto100").value =  over100.toFixed(2);
    var totalgoalsexpected = totalGoals(over100);
    document.getElementById("totgoals").value = totalgoalsexpected.toFixed(2);
    var drawnobethome = DNBHomeperc(home100, away100)
    var drawnobetaway = DNBAwayperc(home100, away100);
    var expectancyhome = totalgoalsexpected * drawnobethome;
    var expectancyaway = totalgoalsexpected * drawnobetaway;
    document.getElementById("homeexp").value = expectancyhome.toFixed(2);
    document.getElementById("awayexp").value = expectancyaway.toFixed(2);
    document.getElementById("supremacy").value = (expectancyhome - expectancyaway).toFixed(2);
}