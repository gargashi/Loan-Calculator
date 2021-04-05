// Listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e){
  // Hide Results
  document.getElementById('results').style.display='none';
  // Show Loader
  document.getElementById('loading').style.display='block';

  setTimeout(calculateResults,2000);

  e.preventDefault();
});

// Create function
function calculateResults(){
  console.log('Calculating....');

  // UI Variables
  const UIamount= document.getElementById('amount');
  const UIinterest= document.getElementById('interest');
  const UIyears= document.getElementById('years');
  const UImonthlyPayment= document.getElementById('monthly-payment');
  const UItotalPayment= document.getElementById('total-payment');
  const UItotalInterest= document.getElementById('total-interest');

  // Calculations
  const principal=parseFloat(UIamount.value);
  const calculatedInterest=parseFloat(UIinterest.value)/100/12;
  const calculatedPayment=parseFloat(UIyears.value)*12;

  // Compute monthly payments
  const x=Math.pow(1+calculatedInterest, calculatedPayment);
  const monthly=(principal*x*calculatedInterest)/(x-1);

  if(isFinite(monthly)){
    UImonthlyPayment.value=monthly.toFixed(2);
    UItotalPayment.value=(monthly*calculatedPayment).toFixed(2);
    UItotalInterest.value=((monthly*calculatedPayment)-principal).toFixed(2);
    // Show Results
    document.getElementById('results').style.display='block';
    // Hide Loader
    document.getElementById('loading').style.display='none';

  }else{
    showError('Please check your numbers');
  }
};

// Show Error

function showError(error){

  // Show Results
  document.getElementById('results').style.display='none';
  // Hide Loader
  document.getElementById('loading').style.display='none';
  // Create div
  const errorDiv=document.createElement('div');

  // get elements
  const card=document.querySelector('.card');
  const heading=document.querySelector('.heading');

  // Add Class
  errorDiv.className='alert alert-danger';

  // Create Text node and append to div
  errorDiv.appendChild(document.createTextNode(error));

  // Insert error above heading
  card.insertBefore(errorDiv, heading);

  // Clear error after 3 seconds
  setTimeout(clearError, 3000);
}

// Clear Error
function clearError(){
  document.querySelector('.alert').remove();
}