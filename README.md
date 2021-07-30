# Doraemonangis BE
> Doremonangis, robot dari masa depan sedang mencoba untuk membuka suatu bisnis pada bidang F&B, yaitu membuat dorayaki kekinian (rasa pempek, rasa KFC, rasa nasi padang, dan lain-lain) di tahun 2021 ini. Mobita, teman baiknya membantunya untuk mendirikan usaha dorayakinya dengan menjadi Co-Founder sekaligus CTO dari usaha Doremonangis yang bernama “Stand with Dorayaki”.

> Selaku CTO, Mobita tentu dipekerjakan oleh Doremonangis untuk membuat sebuah sistem untuk memanajemen tokonya. Akan tetapi, karena Mobita adalah anak yang pemalas, toko Doremonangis sudah memiliki banyak franchise di berbagai tempat. Sehingga, sistem yang dibuat harus menyesuaikan kebutuhan bisnis dari tokonya, apalagi sekarang banyak toko yang mulai kehabisan stok Dorayaki rasa pempek!

> Oleh karena itu, sebagai teman Mobita yang berkuliah di バンドン工科大学 (ITB) cabang Shinjuku, kalian akan dipekerjakan oleh Mobita untuk membuat sistem ini

## Setup
1. Clone repository
```sh
git clone https://github.com/cyn-rus/doraemonangis-be.git
```
2. Jalankan Docker
```sh
docker-compose up --build -d
```

## Fitur
Fitur tersedia:
* Membuat toko (`/store/add`)
* Membaca toko (`/store`)
* Mendapatkan toko spesifik (`/store/:name`)
* Update toko (`/store/update/:id`)
* Hapus toko (`/store/delete/:name`)
* Membuat dorayaki (`/dorayaki/add`)
* Membaca dorayaki (`/dorayaki`)
* Mendapatkan jumlah dorayaki (`/dorayaki/count`)
* Mendapatkan dorayaki spesifik (`/dorayaki/:taste`)
* Menghapus dorayaki (`/dorayaki/:id`)
* Update dorayaki (`/dorayaki/update/:id`)
* Membuat stok (`/own/add`)
* Mendapatkan stok (`/own`)
* Mendapatkan stok berdasarkan nama toko (`/own/:name`)
* Mendapatkan jumlah stok dorayaki dari sebuah toko (`/own/count/:name`)
* Mendapatkan jumlah stok dorayaki dari sebuah toko berdasarkan rasa dorayaki (`/own/get-qty/:name/:taste`)
* Mengurangi jumlah stok (`/own/substract`)
* Menambah jumlah stok (`/own/add`)
* Memindahkan stok dorayaki dari 1 toko ke toko lainnya (`/own/move`)
* Menghapus stok berdasarkan nama toko dan rasa dorayaki (`/own/:name/:taste`)
* Update dorayaki (`/own/update/:id`)

## Kontak
Created by [@cyn-rus](https://github.com/cyn-rus)