import React, {useEffect, useState} from 'react';
import Input from "../common/Input/Input.jsx";
import Button from "../common/Button/Button.jsx";
import styles from './NumberInput.module.scss'

const NumberInputForm = () => {

    const [number, setNumber] = useState('');
    const [numberError, setNumberError] = useState('Номер не может быть пустым');
    const [dirtyNumber, setDirtyNumber] = useState(false);
    const [formIsValid, setFormIsValid] = useState(false);
    const [fetchErrorText, setFetchErrorText] = useState('')
    const [fetchText, setFetchText] = useState('')

    useEffect(() => {
        if (numberError) {
            setFormIsValid(false)
        } else {
            setFormIsValid(true)
        }
    }, [number])

    const phoneNumberHandler = (e) => {
        setNumber(e.target.value)
        const regex = /^(\+{0,})(\d{0,})([(]{1}\d{1,3}[)]{0,}){0,}(\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s|-]?\d+([\s|-]?\d+){1,2}(\s){0,}$/gm
        if (!regex.test(e.target.value)) {
            setNumberError('Некорретный номер телефона')
        } else {
            setNumberError("")
        }
    }

    const blurHandler = (e) => {
        if (e.target.name === "phoneNumber") {
            setDirtyNumber(true)
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();
        fetch('https://6372b027348e947299fb5418.mockapi.io/phone-number/phones', {
            method: 'POST',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: JSON.stringify(number)
        })
            .then(function () {
                setFetchText('Номер успешно отправлен!')
                setTimeout(() => {
                    setFetchText('')
                    setNumber('')
                }, 1500)
            })
            .catch(function () {
                setFetchErrorText('Произошла ошибка')
                setTimeout(() => {
                    setFetchErrorText('')
                    setNumber('')
                }, 1500)
            });
    }

    return (
        <div className={styles.page}>
            {fetchText && <h2 style={{color: 'white'}}>{fetchText}</h2>}
            {fetchErrorText && <h2 style={{color: 'white'}}>{fetchErrorText}</h2>}
            {(numberError && dirtyNumber) && <h2 style={{color: 'red'}}>{numberError}</h2>}
            <form onSubmit={submitHandler}>
                <div className={styles.container}>
                    <div className={styles.form_container}>
                        <Input
                            name="phoneNumber"
                            placeholder="Ваш номер телефона..."
                            value={number}
                            onBlur={e => blurHandler(e)}
                            onChange={e => phoneNumberHandler(e)}
                        />
                        <Button disabled={!formIsValid} type="submit">
                            <fasFaCoffee/>
                            <span>Заказать</span></Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default NumberInputForm;