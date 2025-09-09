document.addEventListener('DOMContentLoaded', () => {
    const memberForm = document.getElementById('memberForm');
    const memberNameInput = document.getElementById('memberName');
    const memberTableBody = document.querySelector('#memberTable tbody');
    
    // 1. Memuat data dari Local Storage saat halaman dimuat
    let members = JSON.parse(localStorage.getItem('memberData')) || [];

    // Fungsi untuk merender (menampilkan) tabel
    function renderTable() {
        memberTableBody.innerHTML = ''; // Mengosongkan isi tabel
        
        members.sort((a, b) => a.name.localeCompare(b.name));

        members.forEach((member, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${member.name}</td>
                <td>${member.count}</td>
            `;
            memberTableBody.appendChild(row);
        });
    }

    // Fungsi untuk menyimpan data ke Local Storage
    function saveData() {
        localStorage.setItem('memberData', JSON.stringify(members));
    }

    // Event listener saat form disubmit
    memberForm.addEventListener('submit', (event) => {
        event.preventDefault(); 
        
        const memberName = memberNameInput.value.trim();
        
        if (memberName) {
            const existingMember = members.find(m => m.name.toLowerCase() === memberName.toLowerCase());

            if (existingMember) {
                existingMember.count++;
            } else {
                members.push({
                    name: memberName,
                    count: 1
                });
            }

            // 2. Memanggil fungsi untuk menyimpan data
            saveData();
            
            // Panggil fungsi untuk memperbarui tampilan tabel
            renderTable();
            
            memberNameInput.value = '';
        }
    });

    // Panggil renderTable() untuk pertama kali saat halaman dimuat
    renderTable();
});
