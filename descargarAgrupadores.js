const axios = require('axios');
const xlsx = require('xlsx');

async function downloadAndSaveToExcel() {
    try {
        // Fetch data from API
        const response = await axios.get('https://closing-template.vercel.app/api/mongo');
        const data = response.data;

        // Transform data to flatten the structure
        const flattenedData = data.map(item => ({
            ID: item._id,
            Title: item.title,
            Team: item.team,
            RaizalID: item.Raizal.id,
            RaizalTitle: item.Raizal.title,
            RaizalStatus: item.Raizal.status,
            Confluence: item.confluence
        }));

        // Create workbook and worksheet
        const workbook = xlsx.utils.book_new();
        const worksheet = xlsx.utils.json_to_sheet(flattenedData);

        // Add worksheet to workbook
        xlsx.utils.book_append_sheet(workbook, worksheet, 'Agrupadores');

        // Save to file
        xlsx.writeFile(workbook, 'agrupadores.xlsx');
        console.log('Excel file created successfully!');
    } catch (error) {
        console.error('Error:', error.message);
    }
}

downloadAndSaveToExcel();
