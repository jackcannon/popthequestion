export default {
    current: null,
    more: [
        {
            answer: 'Andy Murray',
            questions: [
                'Who won Wimbledon in 2016?',
                'Who won an Olympic Gold in Cycling?',
                'Who is as tall as a leprechaun?',
                'Who is a world-famous caber-tosser?',
                'Who has three nipples?',
                'Who is 19 years old?',
                'Who built Rome in 7 days?',
                'Who has a fear of Morocco?',
                'Who is Batman?',
                'Who has an IQ of 263?'
            ]
        },
        {
            answer: 'Katniss Everdeen',
            questions: [
                'Who won the Hunger Games?',
                'Who was Harry Potter’s best friend?',
                'Who sang ‘Gangnam Style’?',
                'Who painted the ‘Mona Lisa’?',
                'Who has a vertical leap of 9 feet?',
                'What is a village in Southern Italy?',
                'What is a brand of Slug Repellent?',
                'Who is the Gym Leader in Pallet Town?',
                'Who is stuck on Mars in ‘The Martian’?'
            ]
        },
        {
            answer: 'Arsenal',
            questions: [
                'Who play at the Emirates Stadium?',
                'Who are the domestic champions of France?',
                'Which team\'s mascot is an eagle?',
                'Where would one store their boating oars?',
                'Where are<br/>the 13 most expensive rabbits?',
                'What is the ‘Jewel of California Bay’?',
                'What is the 13th month called?',
                'Who founded Facebook?'
            ]
        },
        {
            answer: 'Nice, France',
            questions: [
                'Where is the Promenade des Anglais?',
                'What is a type of biscuit?',
                'What is an inland french town?',
                'How do you spell ‘millennium’?',
                'What letter comes after ‘J’?',
                'Where does the Queen get buried?',
                'Where are weetabix made?'
            ]
        },
        {
            answer: 'Canterbury Cathedral',
            questions: [
                'Where did<br/>we both graduate from university?',
                'Where did Andy Murray win the US Open?',
                'Where is<br/>the world’s largest swimming pool?',
                'Where are the Crown Jewels kept?',
                'Where did Charles Darwin write Origin of Species?',
                'Which UK Building is taller than Everest?'
            ]
        },
        {
            answer: 'Pride and Prejudice',
            questions: [
                'What movie will I never watch again?',
                'What is a great Xbox game?',
                'What does the Pope’s tattoo say?',
                'What is JK Rowling’s best selling book?',
                'What is UKIP’s official motto?'
            ]
        },
        {
            answer: 'Penguin',
            questions: [
                'What is the best, cutest animal?',
                'What is the fastest animal on earth?',
                'What is bright red?',
                'What does Pikachu evolve into?'
            ]
        },
        {
            answer: 'Origins Bar, Darwin College',
            questions: [
                'Where did we meet?',
                'Dude, where’s my car?',
                'Where have all the muffins gone?'
            ]
        },
        {
            answer: 'Five',
            questions: [
                'How many years have we been together?',
                'How old is Elvis Presley?'
            ]
        },
        {
            answer: 'YES!',
            questions: [
                'Manny,<br/>will you<br/>marry me?'
            ]
        }
    ],
    nextQuestion: function() {
        this.current = this.more.shift();
        return !!(this.current);
    }
};
