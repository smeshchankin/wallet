(() => {
    const balanceElem = document.getElementById('balance');
    const incomeElem = document.getElementById('income');
    const expensesElem = document.getElementById('expenses');
    const historyElem = document.getElementById('history');
    const formElem = document.getElementById('form');
    const operationElem = document.getElementById('operation');
    const amountElem = document.getElementById('amount');

    let dbHistory = JSON.parse(localStorage.getItem('wallet-online.history')) || [];

    const generateId = () => `uin_${Math.round(Math.random()*1e8).toString(16)}`;

    const renderOperation = (rootElem, op) => {
        const listItem = document.createElement('li');
        listItem.classList.add('history__item');
        listItem.classList.add('history__item-' + (op.amount < 0 ? 'minus' : 'plus'));
        listItem.innerHTML = `
            <span>${op.desc}</span>
            <span class="history__money">$ ${op.amount}</span>
            <button data-id="${op.id}" class="history__delete">x</button>
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
            const op = {id: generateId(), desc: opName, amount: +opValue};
            dbHistory.push(op);
            init(historyElem, dbHistory);

            operationElem.value = '';
            amountElem.value = '';
            operationElem.focus();
        } else {
            if (!opName) {
                operationElem.style.borderColor = 'red';
            }
            if (!opValue) {
                amountElem.style.borderColor = 'red';
            }
        }
    };

    const deleteOperation = (event) => {
        const target = event.target;
        if (target.classList.contains('history__delete')) {
            dbHistory = dbHistory
                .filter(operation => operation.id !== target.dataset.id);
            init(historyElem, dbHistory);
        }
    };

    const init = (rootElem, list) => {
        rootElem.textContent = '';
        list.forEach(item => {
            renderOperation(rootElem, item);
        });
        updateBalance(list);
        localStorage.setItem('wallet-online.history', JSON.stringify(list));
    };

    formElem.addEventListener('submit', addOperation);
    historyElem.addEventListener('click', deleteOperation);
    operationElem.focus();

    init(historyElem, dbHistory);
})();