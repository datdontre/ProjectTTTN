const URL_API = `http://localhost:3000`;
export const lay_loai = async () => {
    let loai_arr;
    loai_arr = await fetch(URL_API + `/loai`).then(res => res.json()).then(data => { return data; });
    let str = `<li class="nav-item"><a class="nav-link fw-bold" href="main.html">Trang Chủ</a></li>`;
    loai_arr.forEach(loai => {
        str += `<li id="${loai.ten_loai}" class="nav-item"><a class="nav-link" href = "sptrongloai.html?id=${loai.id}">${loai.ten_loai}</a></li>`;
    });
    console.log(loai_arr);
    return `<ul class="navbar-nav">${str}</ul>`;
};
export const lay_ten_loai = async (id) => {
    let loai;
    try {
        loai = await fetch(URL_API + `/loai/${id}`).then(res => res.json()).then(d => d);
    }
    catch (err) {
        return `Không có .  (Không có id loại là ${id})`;
    }
    ;
    return `${loai.ten_loai}`;
};
const code_mot_sp = (sp) => {
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
};
export const lay_sp_trong_loai = async (id) => {
    let sp_arr;
    let url = URL_API + `/san_pham?id_loai=${id}`;
    sp_arr = await fetch(url).then(res => res.json()).then(d => d);
    console.log(sp_arr);
    let str = ``;
    sp_arr.forEach(sp => str += code_mot_sp(sp));
    return str;
};
export const lay_sp_tu_id = async (id) => {
    let sp_arr;
    let url = URL_API + `/san_pham?id=${id}`;
    sp_arr = await fetch(url).then(res => res.json()).then(d => d);
    console.log(sp_arr);
    let str = ``;
    sp_arr.forEach(sp => {
        str += `<div class="container mt-5">
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
            <div class="d-flex">
                <a class="btn btn-primary me-2" id="add-to-cart-${sp.id}" href="giohang.html">Thêm vào giỏ hàng</a>
                <a class="btn btn-danger" href="top">Mua ngay</a>
            </div>  
            </div>
        </div>
    </div>`;
    });
    return str;
};
export const lay_sp = async () => {
    let sanpham_arr;
    sanpham_arr = await fetch(URL_API + `/san_pham`).then(res => res.json()).then(data => { return data; });
    let str = ` `;
    sanpham_arr.forEach(sanpham => {
        str += code_mot_sp(sanpham);
    });
    console.log(sanpham_arr);
    return str;
};
export const lay_sp_moi = async (so_sp = 6) => {
    let sp_arr;
    let url = URL_API + `/san_pham?_sort=-ngay&_limit=${so_sp}`;
    sp_arr = await fetch(url).then(res => res.json()).then(d => d);
    let str = ``;
    sp_arr.forEach(sp => str += code_mot_sp(sp));
    return str;
};
export const lay_sp_hot = async (so_sp = 6) => {
    let sp_arr;
    let url = URL_API + `/san_pham?hot=1&_limit=${so_sp}`;
    sp_arr = await fetch(url).then(res => res.json()).then(d => d);
    let str = ``;
    sp_arr.forEach(sp => str += code_mot_sp(sp));
    return str;
};
export const lay_sp_xem_nhieu = async (so_sp = 6) => {
    let sp_arr;
    let url = URL_API + `/san_pham?_sort=-luot_xem&_limit=${so_sp}`;
    sp_arr = await fetch(url).then(res => res.json()).then(d => d);
    let str = ``;
    sp_arr.forEach(sp => str += code_mot_sp(sp));
    return str;
};
const gioHang = JSON.parse(localStorage.getItem('gioHang') || '[]');
export const hienThiGioHang = () => {
    const cartDataContainer = document.getElementById('cart-data');
    const emptyMessage = "Giỏ hàng của bạn đang trống.";
    if (gioHang.length === 0) {
        cartDataContainer.innerHTML = `<p>${emptyMessage}</p>`;
        return;
    }
    cartDataContainer.innerHTML = gioHang.map(sp => `
        <div>
            <h5>${sp.ten}</h5>
            <p>Giá: ${Number(sp.gia).toLocaleString("vi")} vn₫</p>
            <button class="btn btn-danger" onclick="xoaKhoiGioHang(${sp.id})">Xóa</button>
        </div>
    `).join('');
};
export const themVaoGioHang = (sanPham) => {
    gioHang.push(sanPham);
    localStorage.setItem('gioHang', JSON.stringify(gioHang));
    alert(`${sanPham.ten} đã được thêm vào giỏ hàng!`);
    hienThiGioHang();
};
export const xoaKhoiGioHang = (id) => {
    const index = gioHang.findIndex(sp => sp.id === id);
    if (index !== -1) {
        gioHang.splice(index, 1);
        localStorage.setItem('gioHang', JSON.stringify(gioHang));
        hienThiGioHang();
    }
};
