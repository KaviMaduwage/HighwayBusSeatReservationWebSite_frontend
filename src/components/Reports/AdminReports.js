import { useState } from "react";

import {generateBusOwnerListReport} from "../../services/reportService";

export default function AdminReports() {
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

    async function generateBusOwnersDetailReport() {
        try {
            generateBusOwnerListReport().then(response => {
                let pdfName = "BusOwnersListReport.pdf";
                generatePDF(response, pdfName);

            });


        } catch (error) {
            // Handle error
            setErrorMessage("Error generating the report: " + error.message);
        }
    }

    return (
        <div>
            <h1>Reports</h1>

            <div style={{marginTop:'25px'}}>
                <hr/>
                <p>{errorMessage}</p>

                <h4>Bus Owners' Detail Report</h4>
                <button onClick={generateBusOwnersDetailReport}>Generate Report</button>

            </div>

            <div style={{marginTop:'25px'}}>
                <hr/>


            </div>

        </div>
    );
}