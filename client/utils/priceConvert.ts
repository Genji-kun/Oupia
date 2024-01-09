const formatCurrency = (price: number) => {
    return price.toLocaleString('vi-VN');
}

const levels = ["", "Nghìn", "Triệu", "Tỷ", "Nghìn Tỷ", "Triệu Tý"];

const numberToCurrency = (num: number) => {
    let groups = [];
    if (num == 0) {
        return "0";
    } else {
        while (num > 0) {
            groups.push(num % 1000);
            num = Math.floor(num / 1000);
        }
        let result = '';
        for (let i = 0; i < groups.length; i++) {
            if (groups[i] > 0) {
                result = groups[i] + ' ' + levels[i] + ' ' + result;
            }
        }
        return result.trim();
    }
}




export { formatCurrency, numberToCurrency }