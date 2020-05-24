document.getElementById('formPicoPlaca').addEventListener('submit', consultCarOnTheRoad);

function consultCarOnTheRoad(e){

    let licensePlate = document.getElementById('licensePlate').value;
    let date = document.getElementById('date').value;
    let hour = document.getElementById('hour').value;

    //OBJECT CAR
    const dataCar = {
        licensePlate,
        date,
        hour
    };

    console.log(dataCar);


    e.preventDefault();
}
