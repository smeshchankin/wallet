(() => {
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

    const renderOperation = (rootElem, op) => {
        const listItem = document.createElement('li');
        listItem.classList.add('history__item');
        listItem.classList.add('history__item-' + (op.amount < 0 ? 'minus' : 'plus'));
        listItem.innerHTML = `
            <span>${op.desc}</span>
            <span>$ ${op.amount}</span>
            <button class="history__delete">x</button>
        `;

        rootElem.append(listItem);
    };

    const updateBalance = (list) => {
        const income = list
            .filter(item => item.amount > 0)
            .reduce((sum, item) => sum + item.amount, 0);
        const expenses = list
            .filter(item => item.amount < 0)
            .reduce((sum, item) => sum - item.amount, 0);

        balanceElem.textContent = '$ ' + (income - expenses);
        incomeElem.textContent = '$ ' + income;
        expensesElem.textContent = '$ ' + expenses;
    };

    const addOperation = (event) => {
        event.preventDefault();

        const opName = operationElem.value;
        const opValue = amountElem.value;
        operationElem.style.borderColor = '';
        amountElem.style.borderColor = '';

        if (opName && opValue) {
            const op = {id: 0, desc: opName, amount: +opValue};
            dbHistory.push(op);
            init(historyElem, dbHistory);

            operationElem.value = '';
            amountElem.value = '';
        } else {
            if (!opName) {
                operationElem.style.borderColor = 'red';
            }
            if (!opValue) {
                amountElem.style.borderColor = 'red';
            }
        }
    };

    const init = (rootElem, list) => {
        rootElem.textContent = '';
        list.forEach(item => {
            renderOperation(rootElem, item);
        });
        updateBalance(list);
    };

    formElem.addEventListener('submit', addOperation);

    init(historyElem, dbHistory);
})();