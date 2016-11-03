export default {
    current: null,
    more: [
        {
            answer: 'A: Test',
            questions: [
                'A: Correct',
                'A: Wrong 1',
                'A: Wrong 2',
                'A: Wrong 3',
                'A: Wrong 4',
                'A: Wrong 5',
                'A: Wrong 6',
                'A: Wrong 7',
                'A: Wrong 8',
                'A: Wrong 9'
            ]
        },
        {
            answer: 'B: Test',
            questions: [
                'B: Correct',
                'B: Wrong 1',
                'B: Wrong 2',
                'B: Wrong 3',
                'B: Wrong 4',
                'B: Wrong 5',
                'B: Wrong 6',
                'B: Wrong 7',
                'B: Wrong 8',
                'B: Wrong 9'
            ]
        },
        {
            answer: 'C: Test',
            questions: [
                'C: Correct',
                'C: WRONG 1',
                'C: WRONG 2',
                'C: WRONG 3',
                'C: WRONG 4',
                'C: WRONG 5',
                'C: WRONG 6',
                'C: WRONG 7',
                'C: WRONG 8',
                'C: WRONG 9'
            ]
        }
    ],
    nextQuestion: function() {
        this.current = this.more.shift();
        return !!(this.current);
    }
};