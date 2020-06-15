document.getElementById('loan-form').addEventListener('submit', function(e){
    //Hide Results
    document.getElementById('results').style.display = 'none';

    //Show Loading Image
    document.getElementById('loading').style.display = 'block';

    setTimeout(calculateResults, 2000);

    e.preventDefault();
});

//Calculate results function
function calculateResults(){
    console.log('Calculating....');
    //UI vars
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayment = parseFloat(years.value) * 12;

    //Monthly Payments
    const x = Math.pow(1 + calculatedInterest, calculatedPayment);
    const monthly = (principal * x * calculatedInterest) / (x - 1);

    if(isFinite(monthly)){
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayment).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayment) - principal).toFixed(2);
        //Show Results
        document.getElementById('results').style.display = 'block';
        //Hide Loader
        document.getElementById('loading').style.display = 'none';
    }else{
        showError('Please enter loan amount.');
    }

   
}
//Show Error
function showError(error){
    //Hide Results
    document.getElementById('results').style.display = 'none';
    //Hide Loader
    document.getElementById('loading').style.display = 'none';
    //Creating the div element
    const errorDiv = document.createElement('div');

    //Get element
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    //Add class to div element
    errorDiv.className = 'alert alter-danger';

    //Create text node and append to the new div
    errorDiv.appendChild(document.createTextNode(error));

    //Insert error message above heading

    card.insertBefore(errorDiv, heading);

    //Clear error message
    setTimeout(clearError, 2000);
}

function clearError(){
    document.querySelector('.alert').remove();
}