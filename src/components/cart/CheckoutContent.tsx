/* eslint-disable no-unused-vars */

import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import CustomSelect from "../select/CustomSelect";

interface FormEventHandler {
    (event: React.FormEvent<HTMLFormElement>): void;
}

const CheckoutContent = () => {

    const handleForm: FormEventHandler = (event) => {
        event.preventDefault()
        const form = event.target as HTMLFormElement;
        form.reset()
    }

    const persons = [
        { value: '1', label: 'Montevideo' },
        { value: '2', label: 'Canelones' },
        { value: '3', label: 'Maldonado' },
        { value: '4', label: 'Otro departamento' },
    ]

    const cartItems = useSelector((state: RootState) => state.cart.items);
    const subtotal = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    return (
        <div className="checkout-area default-padding">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <form className="checkout-form" onSubmit={handleForm}>
                            <div className="row">
                                <div className="col-lg-6">
                                    <h3>Datos de contacto</h3>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <label htmlFor="name">Nombre *</label>
                                                <input className="form-control" id="f-name" name="f-name" type="text" autoComplete="off" required />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <label htmlFor="phone">Apellido *</label>
                                                <input className="form-control" id="l-name" name="l-name" type="text" autoComplete="off" required />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <label htmlFor="select">Departamento *</label>
                                                <CustomSelect options={persons} selectValue={1} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <label htmlFor="name">Dirección del evento *</label>
                                                <input className="form-control" id="st-address" name="st-address" type="text" placeholder="Calle y número" autoComplete="off" required />
                                                <input className="form-control" id="st-address2" name="st-address2" type="text" placeholder="Apto, barrio o referencias (opcional)" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <label htmlFor="t-city">Ciudad / Localidad *</label>
                                                <input className="form-control" id="t-city" name="t-city" type="text" autoComplete="off" required />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <label htmlFor="phone">Teléfono / WhatsApp *</label>
                                                <input className="form-control" id="phone" name="phone" type="tel" autoComplete="off" required />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <label htmlFor="email">Email *</label>
                                                <input className="form-control" id="email" name="email" type="email" autoComplete="off" required />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <h3>Detalles del evento</h3>
                                    <div className="form-group comments">
                                        <label htmlFor="comments">Comentarios (opcional)</label>
                                        <textarea className="form-control" id="comments" name="comments" placeholder="Fecha y hora del evento, cantidad de invitados, opciones para celíacos o vegetarianos, pedidos especiales..." autoComplete="off" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="shop-cart-totals mt-50 mt-md-30 mt-xs-10">
                                        <h2>Tu presupuesto</h2>
                                        <div className="table-responsive table-bordered">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Menú</th>
                                                        <th scope="col">Subtotal</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {cartItems.map((item) => (
                                                        <tr key={item.id}>
                                                            <th>{item.title} × {item.quantity}</th>
                                                            <td>${(item.price * item.quantity).toFixed(0)}</td>
                                                        </tr>
                                                    ))}
                                                    <tr>
                                                        <th scope="row">Traslado</th>
                                                        <td>Sin costo en Montevideo y Ciudad de la Costa</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Total</th>
                                                        <td>${subtotal.toFixed(0)}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <p className="woocommerce-info">
                                        Para reservar la fecha se abona una seña de $2000 por Abitab / Red Pagos o transferencia al banco Itaú. La fecha queda reservada únicamente cuando nos enviás el comprobante por WhatsApp.
                                    </p>
                                    <button type="submit" name="submit" id="submit">Enviar solicitud</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutContent;
