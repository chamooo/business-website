// Form validation ---------------------------------

let countryData;

let index = 0;

const phoneInput = document.querySelectorAll('.phone');

phoneInput.forEach((input, i) => {
    index = i;
    const phoneInput = window.intlTelInput(input, {
        preferredCountries: ['ua', 'pl'],
        initialCountry: 'ua',
        utilsScript:
            'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.21/js/utils.js',
    });

    countryData = phoneInput.getSelectedCountryData();
    input.value = `+${countryData.dialCode}`;
    input.addEventListener('countrychange', function () {
        countryData = phoneInput.getSelectedCountryData();
        input.value = `+${countryData.dialCode}`;
    });
});

[].forEach.call(document.querySelectorAll('.phone'), function (input) {
    var keyCode;

    function mask(event) {
        event.keyCode && (keyCode = event.keyCode);
        var pos = this.selectionStart;
        var matrix = `+${countryData.dialCode}-___-___-___`,
            i = 0,
            def = matrix.replace(/\D/g, ''),
            val = this.value.replace(/\D/g, ''),
            new_value = matrix.replace(/[_\d]/g, function (a) {
                return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
            });
        i = new_value.indexOf('_');
        var num = countryData.dialCode.length + 1;
        if (i != -1) {
            i < num && (i = 1);
            new_value = new_value.slice(0, i);
        }
        var reg = matrix
            .substr(0, this.value.length)
            .replace(/_+/g, function (a) {
                return '\\d{1,' + a.length + '}';
            })
            .replace(/[+]/g, '\\$&');
        reg = new RegExp('^' + reg + '$');
        if (!reg.test(this.value) || this.value.length < num || (keyCode > 47 && keyCode < 58))
            this.value = new_value;
        if (event.type == 'blur' && this.value.length < num) this.value = '';
    }

    input.addEventListener('input', mask, false);
    input.addEventListener('focus', mask, false);
    input.addEventListener('blur', mask, false);
    input.addEventListener('keydown', mask, false);

    input.addEventListener('keydown', (e) => {
        input.setSelectionRange(input.value.length, input.value.length);
    });
});

function validateForm() {
    function validateTextField(input) {
        // const regex = /^[a-zA-Zа-яА-ЯіІїЇєЄ']{1,}( [a-zA-Zа-яА-ЯіІїЇєЄ']{1,}){0,2}$/;
        if (input.value.length > 1) {
            input.classList.remove('invalid')
            return true;
        } else {
            input.classList.add('invalid')
            return false;
        }
    }

    function validateEmail(input) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (regex.test(input.value.trim())) {
            input.classList.remove('invalid')
            return true;
        } else {
            input.classList.add('invalid')
            return false;
        }
    }

    function validatePhone(input) {
        let regex = new RegExp(`^\\+?${countryData.dialCode}-\\d{3}-\\d{3}-\\d{3}$`);
        if (countryData.dialCode === '44') {
            regex = new RegExp(`^\\+?${countryData.dialCode}\\d{1}-\\d{3}-\\d{3}-\\d{3}$`);
        }

        if (regex.test(input.value)) {
            input.classList.remove('invalid')
            return true;
        } else {
            input.classList.add('invalid')
            return false;
        }
    }

    function validateIfEmpty(input) {
        if (input.value.length) {
            input.classList.remove('invalid')
            return true;
        } else {
            input.classList.add('invalid')
            return false;
        }
    }


    const forms = document.querySelectorAll('form');
    console.log('awd')
    forms.forEach((form) => {
        const inputs = form.querySelectorAll('.text-field, .email, .phone');
        const selects = form.querySelectorAll('select[required]');
        const checkboxes = form.querySelectorAll('input[type="checkbox"]');
        const someCheckboxes = form.querySelectorAll('input[type="checkbox"].some');
        const requiredCheckboxes = form.querySelectorAll('input[type="checkbox"][required]');
        const submitBtn = form.querySelector('[type="submit"]');

        function validateTextInput(input) {
            if (input.classList.contains('text-field')) {
                return validateTextField(input);
            } else if (input.classList.contains('email')) {
                return validateEmail(input);
            } else if (input.classList.contains('phone')) {
                return validatePhone(input);
            } else {
                return validateIfEmpty(input)
            }
        }

        function validateCheckboxes() {
            if (someCheckboxes.length && ![...someCheckboxes].some(checkbox => checkbox.checked)) {
                return false;
            }
            if (requiredCheckboxes.length && ![...requiredCheckboxes].every(checkbox => checkbox.checked)) {
                return false;
            }
            return true;
        }

        // const disableButton = () => {
        //    const validateSelects = [...selects].every(select => select.value.length);
        //
        //    if ([...inputs].some(input => input.value.length > 3)) {
        //       const allInputsValid = ([...inputs].every(validateTextInput) && validateCheckboxes() && validateSelects);
        //       submitBtn.disabled = !allInputsValid;
        //    }
        // };


        submitBtn.addEventListener('click', e => {
            const validateSelects = [...selects].every(select => select.value.length);
            if ([...inputs].some(input => input.value.length > 3)) {
                const allInputsValid = ([...inputs].every(validateTextInput) && validateCheckboxes() && validateSelects);
                inputs.forEach(input => {
                    validateTextInput(input);
                })
                if(!allInputsValid) {
                    e.preventDefault();
                } else {
                    e.target.textContent = 'Please, wait...';
                    e.target.disabled = true;

                    e.preventDefault();
                    setTimeout(() => {
                        e.target.textContent = 'Leave request';
                        e.target.disabled = false;

                        document.querySelector('.alert').innerHTML = 'Your message has been <b>successfully</b> sent';
                        form.reset();
                        setTimeout(() => {
                            document.querySelector('.alert').innerHTML = '';
                        }, 7000)
                    }, 1000)
                }
            }
        }, true);


        // selects.forEach(select => {
        //    select.addEventListener('change', e => {
        //       // disableButton();
        //    });
        // })
        //
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
            });
        });


        inputs.forEach((input) => {
            input.addEventListener('input', () => {
                validateTextInput(input);
            })
        });
    });
}

validateForm();
