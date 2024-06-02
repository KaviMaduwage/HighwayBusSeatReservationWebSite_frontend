import completeImg from "../../images/completeImg.png";
import {useState} from "react";
import {generateTicketPDF} from "../../services/reservationService";

export default function PaymentSuccess(){
    const [errorMessage, setErrorMessage] = useState('');

    function generatePDF(response, pdfName) {
        if (response.status === 200) {
            // Create a blob from the array buffer
            const blob = new Blob([response.data], { type: 'application/pdf' });
            console.log(response.data);
            // Create a URL for the blob
            const url = window.URL.createObjectURL(blob);
            // Create an anchor element to trigger the download
            const a = document.createElement('a');
            a.href = url;
            a.download = pdfName;
            // Append the anchor element to the body and click it
            document.body.appendChild(a);
            a.click();
            // Cleanup
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        } else {

            setErrorMessage("Failed to generate the report");
        }

    }

    async function generateTicket() {
        try {
            generateTicketPDF().then(response => {
                let pdfName = "Ticket.pdf";
                generatePDF(response, pdfName);

            });


        } catch (error) {
            // Handle error
            setErrorMessage("Error generating the report: " + error.message);
        }
    }

    return (
        <div className="signUp-signIn-container" style={{marginBottom : "5%"}}>
            <img src={completeImg} style={{width:"70px", height:'70px', marginLeft:'45%', marginTop:'10px'}} alt="transaction complete"/>
            <h2>Transaction Success</h2>
            <h3>Thank you for choosing My Seat. Download the ticket.</h3>
            <h4>Have a safe and great journey</h4>
            <div>
                <h3>Go to Profile->My Reservations to download the ticket/s.</h3>
            </div>

        </div>
    )
}