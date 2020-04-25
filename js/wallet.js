(function() {
    const balanceElem = document.getElementById('balance');
    const incomeElem = document.getElementById('income');
    const expensesElem = document.getElementById('expenses');
    const historyElem = document.getElementById('history');
    const formElem = document.getElementById('form');
    const operationElem = document.getElementById('operation');
    const amountElem = document.getElementById('amount');

    const dbHistory = [
        {id: 1, desc: 'Salary', amount: 300},
        {id: 2, desc: 'Food', amount: -80},
        {id: 3, desc: 'Cinema', amount: -50},
        {id: 4, desc: 'Freelance', amount: 100},
        {id: 5, desc: 'Books', amount: -40}
    ];

    const renderOperation = (rootElem) => {
        const listItem = document.createElement('li');
        listItem.classList.add('history__item');
        listItem.innerHTML = `
            <span>Salary</span>
            <span>$ 1000</span>
            <button class="history__delete">x</button>
        `;

        rootElem.append(listItem);
    };

    const init = () => {
        historyElem.textContent = '';
    };

    init();
    renderOperation(historyElem);
})();