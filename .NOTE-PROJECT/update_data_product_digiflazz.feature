Fitur: Update Product Otomatis dari DigiFlazz
Sebagai seorang pengguna, saya ingin mendaftarkan diri sebagai entitas untuk proses autentikasi.
 
Payload:
 -password
 
Spesifikasi:
 - Ketika mendaftar tanpa memberikan entitas yang dibutuhkan:
   - maka error
 - Ketika mendaftar dengan memberikan entitas yang tipe datanya tidak sesuai: 
   - maka error
 - Ketika mendaftar dengan username lebih dari 50 karakter:
   - maka error
 - Ketika mendaftar dengan username yang mengandung karakter terlarang:
   - maka error 
 - Ketika mendaftar dengan username yang sudah digunakan:
   - maka error
 - Ketika mendaftar dengan payload yang benar
   - maka user baru harus terbuat
 
Catatan sisi sistem:
 - membuat category bila belum ada
 - mengambil kategory bila sudah ada
 - membuat provider bila belum ada
 - mengambil id provider bila sudah ada