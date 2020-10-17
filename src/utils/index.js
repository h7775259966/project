export const filterEmpty = (data, allowEmptyKeys) => {
    if (data) {
        if (data instanceof Array) {
            return data;
        }
        const rst = {};
        Object.keys(data).forEach(key => {
            const value = data[key];
            if (allowEmptyKeys && allowEmptyKeys.includes(key)) {
                rst[key] = value;
            } else {
                (value || value === 0 || typeof value === 'boolean') && (rst[key] = value);
            }
        });
        return rst;
    }
}


export const transFormArray2Object = (form, keys) => {
	form.cascaderList.forEach((el, i) => {
		form[keys[i]] = el
	})
	return form;
}

export const transFormObject2Array = (form, keys) => {
	form.cascaderList = []
	keys.forEach(el => {
		form.cascaderList.push(form[el])
	})
	return form;
}