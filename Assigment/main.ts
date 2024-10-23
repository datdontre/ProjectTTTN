const URL_API = `http://localhost:3000`;
type TLoai = {
    id: number,
    ten_loai: string,
    thu_tu: number,
    an_hien: number
}
interface ISan_Pham {
    id: number,
    hinh: String,
    ten: String,
    loai: String,
    gia: number,
    ngay: String,
    luot_xem: number,
    so_luong: number,
    hot: number,
    mo_ta: String
}

/*
let sp1:TGiay;
sp1 = {
    id: 1,
    ten: "Giày Thể Thao Nam Adidas Runfalcon 2.0 GV9559",
    hinh: "images/1.jpg",
    loai: "Giày thể thao nam",
    gia: 2000000,
    ngay: "2024-10-8",
    luot_xem: 99,
}

function hien1sp(){
    let str = `
         <div class="sp1">
             <h3>${sp1.ten}</h3>
             <p>Giá: ${Number(sp1.gia).toLocaleString("vi")} VND</p>
             <img src="${sp1.hinh}">
             <p>Cập nhật: ${new Date(sp1.ngay).toLocaleDateString("vi")}</p>
             <p>Lượt xem: ${sp1.luot_xem}</p>
        </div>`;
    return str;
}
*/
export const lay_loai = async () => {
    let loai_arr:TLoai[];
    loai_arr =  await fetch(URL_API + `/loai`).then( res => res.json()).then ( data => {return data});
    let str = `<li class="nav-item"><a class="nav-link fw-bold" href="main.html">Trang Chủ</a></li>`;
    loai_arr.forEach( loai =>{
       str+=`<li id="${loai.ten_loai}" class="nav-item"><a class="nav-link" href = "sptrongloai.html?id=${loai.id}">${loai.ten_loai}</a></li>`;
    })
    console.log(loai_arr);
    return `<ul class="navbar-nav">${str}</ul>`;
}

export const lay_ten_loai = async (id) => {
    let loai:TLoai;
    try {
       loai =  await fetch(URL_API + `/loai/${id}`).then( res => res.json()).then ( d => d);
    }     
    catch(err){
        return `Không có .  (Không có id loại là ${id})`;
    };
    return `${loai.ten_loai}`;
}

const code_mot_sp = (sp:ISan_Pham):string => {
    return `    
    <div class="col-lg-3 col-md-6 col-sm-12 mb-4">
            <div class="card">
                <img src="${sp.hinh}" class="card-img-top img-fluid" alt="${sp.ten}">
                <div class="card-body">
                    <h5 class="card-title">${sp.ten}</h5>
                    <p class="card-text">Giá: ${Number(sp.gia).toLocaleString("vi")} VND</p>
                    <p class="card-text">Cập nhật: ${new Date(sp.ngay).toLocaleDateString("vi")}</p>
                    <a href="chitietsp.html?id=${sp.id}" class="btn btn-primary">Buy Now</a>
                </div>
            </div>
    </div>`;
}

export const lay_sp_trong_loai = async (id) => {
    let sp_arr:ISan_Pham[];
    let url = URL_API + `/san_pham?id_loai=${id}`;
    sp_arr = await fetch(url).then( res => res.json()).then ( d => d);
    console.log(sp_arr);
    let str=``;
    sp_arr.forEach( sp => str+= code_mot_sp(sp));
    return str;
}

export const lay_sp_tu_id = async (id) => {
    let sp_arr:ISan_Pham[];
    let url = URL_API + `/san_pham?id=${id}`;
    sp_arr = await fetch(url).then( res => res.json()).then ( d => d);
    console.log(sp_arr);
    let str=``;
    sp_arr.forEach( sp =>{      
    str+=  `<div class="container mt-5">
    <div class="row">
        <!-- Phần trái: Hiển thị hình ảnh sản phẩm -->
        <div class="col-md-6">
            <img src="${sp.hinh}" alt="${sp.ten}" class="img-fluid">
        </div>
        <!-- Phần phải: Thông tin chi tiết sản phẩm -->
        <div class="col-md-6">
            <h2>${sp.ten}</h2>
            <p>${sp.mo_ta}</p>
            <p>Giá: ${Number(sp.gia).toLocaleString("vi")} vn₫</p>
            <p>Kích thước: 
                <div class="btn-group" role="group" aria-label="Kích thước giày">
                    <button type="button" class="btn btn-outline-primary">38</button>
                    <button type="button" class="btn btn-outline-primary">39</button>
                    <button type="button" class="btn btn-outline-primary">40</button>
                    <button type="button" class="btn btn-outline-primary">41</button>
                    <button type="button" class="btn btn-outline-primary">42</button>
                </div>
            </p>
            <button class="btn btn-primary">Thêm vào giỏ hàng</button>
            <button class="btn btn-danger">Mua ngay</button>
            </div>
        </div>
    </div>`;
     })
    return str;
}

export const lay_sp = async () => {
    let sanpham_arr:ISan_Pham[];
    sanpham_arr =  await fetch(URL_API + `/san_pham`).then( res => res.json()).then ( data => {return data});
    let str = ` `;
    sanpham_arr.forEach( sanpham =>{
       str+=code_mot_sp(sanpham);  
    })
    console.log(sanpham_arr);
    return str;
}

export const lay_sp_moi = async (so_sp=6) => {
    let sp_arr:ISan_Pham[];
    let url = URL_API + `/san_pham?_sort=-ngay&_limit=${so_sp}`;
    sp_arr = await fetch(url).then( res => res.json()).then ( d => d);
    let str=``;
    sp_arr.forEach( sp => str+= code_mot_sp(sp));
    return str;
}

export const lay_sp_hot = async (so_sp=6) => {
    let sp_arr:ISan_Pham[];
    let url = URL_API + `/san_pham?hot=1&_limit=${so_sp}`;
    sp_arr = await fetch(url).then( res => res.json()).then ( d => d);
    let str=``;
    sp_arr.forEach( sp => str+= code_mot_sp(sp));
    return str;
}

export const lay_sp_xem_nhieu = async (so_sp=6) => {
    let sp_arr:ISan_Pham[];
    let url = URL_API + `/san_pham?_sort=-luot_xem&_limit=${so_sp}`;
    sp_arr = await fetch(url).then( res => res.json()).then ( d => d);
    let str=``;
    sp_arr.forEach( sp => str+= code_mot_sp(sp));
    return str;
}
/*const sanpham_arr:TGiay[];
sanpham_arr = [{   
    id: 1,
    ten: "Giày Thể Thao Nam Adidas Runfalcon 2.0 GV9559",
    hinh: "images/1.jpg",
    loai: "Giày thể thao nam",
    gia: 2000000,
    ngay: "2024-10-8",
    luot_xem: 99,
    so_luong: 99,
    hot: 0
},
{
    id: 2,
    ten: "Giày Sneaker Nam Dior B27 Black Patent Leather",
    hinh: "images/2.jpg",
    loai: "Giày thể thao nam",
    gia: 30000000,
    ngay: "2024-10-7",
    luot_xem: 101,
    so_luong: 99,
    hot: 1

},
{
    id: 3,
    ten: "Giày Sneaker Nam Dior B27 High ‘Dior Oblique Galaxy White’",
    hinh: "images/3.jpg",
    loai: "Giày thể thao nam",
    gia: 15500000,
    ngay: "2024-10-7",
    luot_xem: 99,
    so_luong: 99,
    hot: 1
},
{
    id: 4,
    ten: "Giày Sneaker Nữ Dior Star White Calfskin And Suede",
    hinh: "images/4.jpg",
    loai: "Giày thể thao nữ",
    gia: 15500000,
    ngay: "2024-10-7",
    luot_xem: 99,
    so_luong: 99,
    hot: 0
},
{
    id: 5,
    ten: "Giày Sneaker Nữ Adidas Superstar Pulse Blue GV8978 Màu Trắng",
    hinh: "images/5.jpg",
    loai: "Giày thể thao nữ",
    gia: 1950000,
    ngay: "2024-10-7",
    luot_xem: 99,
    so_luong: 99,
    hot: 0
},
{
    id: 6,
    ten: "Giày Lười Nữ Dior Women's Loafer KDB749ACA 24W Trắng Kem",
    hinh: "images/6.jpg",
    loai: "Giày lười nữ",
    gia: 3999999,
    ngay: "2024-10-8",
    luot_xem: 99,
    so_luong: 99,
    hot: 1
},
{
    id: 7,
    ten: "Giày Tây Dior Timeless Derby Shoe Black Polished Calfskin 3DE305YON_H969 Đen",
    hinh: "images/7.jpg",
    loai: "Giày tây nam",
    gia: 21890000,
    ngay: "2024-10-8",
    luot_xem: 99,
    so_luong: 99,
    hot: 1
}]

function show1sp(sp:TGiay){
    let str = `
        <div class="col-3 mb-4">
            <div class="card">
                <img src="${sp.hinh}" class="card-img-top img-fluid" alt="${sp.ten}">
                <div class="card-body">
                    <h5 class="card-title">${sp.ten}</h5>
                    <p class="card-text">Giá: ${Number(sp.gia).toLocaleString("vi")} VND</p>
                    <p class="card-text">Cập nhật: ${new Date(sp.ngay).toLocaleDateString("vi")}</p>
                    <a href="#" class="btn btn-primary">Buy Now</a>
                </div>
            </div>
        </div>`;
    return str;
}

    function code_menu(){
        let str:string = ``;
        str += `<li class="nav-item"><a class="nav-link fw-bold" href="#">Trang Chủ</a></li>`;
        loai_arr.forEach(loai => str += `<li class="nav-item"><a class="nav-link" href = "">${loai.ten_loai}</a></li>`);
        return `<ul class="navbar-nav">${str}</ul>`;
    }

function code_sp_moi(so_sp){
    let sp_arr:TGiay[] = sanpham_arr.sort(
        function (a:TGiay, b: TGiay){
            let d1 = new Date(a.ngay);
            let d2 = new Date(b.ngay);
            if (d1 < d2) return 1;
            else if (d1 > d2) return -1;
            else return 0;
        }
    );
    let str = "";
    sp_arr.slice(0, so_sp).forEach(sp => str+=show1sp(sp))
    return str;
}

function code_sp_xem_nhieu(so_sp){
    let sp_arr:TGiay[] = sanpham_arr.sort(
        function (a:TGiay, b: TGiay){
            let d1 = a.luot_xem;
            let d2 = b.luot_xem;
            if (d1 < d2) return 1;
            else if (d1 > d2) return -1;
            else return 0;
        }
    );
    let str = "";
    sp_arr.slice(0, so_sp).forEach(sp => str+=show1sp(sp))
    return str;
}

function code_sp_noi_bat(so_sp){
    let sp_noi_bat_arr:TGiay[] = sanpham_arr.filter(
        function (sp:TGiay){
            if(sp.hot==1) return true; else return false;
        }
    );
    let str = "";
    sp_noi_bat_arr.slice(0, so_sp).forEach(sp => str+=show1sp(sp))
    return str;
}
/*const show1sp = (sp:TGiay) => {
    let str = `
        <div class="sp1">
             <h3>${sp.ten}</h3>
             <p>Giá: ${Number(sp.gia).toLocaleString("vi")} VND</p>
             <img src="${sp.hinh}">
             <p>Cập nhật: ${new Date(sp.ngay).toLocaleDateString("vi")}</p>
             <p>Lượt xem: ${sp.luot_xem}</p>
        </div>`;
    return str;
}
function hienlistsp(){
    let str = "";
    sanpham_arr.forEach(sp => str+=show1sp(sp))
    return str;
}*/