const { getAllServicios, getServicioId, createServicio, updateServicio, deleteServicio } = require('../services/serviciosService');

const getAllServices = async (req, res) => {
    try {
        const datos = await getAllServicios();
        res.status(200).json(datos);
    } catch (err) {
        console.log("Error en obtener servicios: ", err);
        res.status(500).json({ message: 'Error al obtener servicios' });
    }
};

const getService = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: 'Falta el id que es obligatorio' });
    }

    try {
        const datos = await getServicioId(id);
        res.status(200).json(datos);
    } catch (err) {
        console.log("Error en obtener el servicio: ", err);
        res.status(500).json({ message: 'Error al obtener el servicio' });
    }
}

const addService = async (req, res) => {
    const { servicio, nombre, nombre_publico, correo, info, fecha, reservacion, aceptacion } = req.body;

    if (!servicio || !nombre || !nombre_publico || !correo|| !info || !fecha || !aceptacion) {
        return res.status(400).json({ message: 'Faltan datos obligatorios' });
    }

    try {
        const newReservation = await createServicio({
            servicio, nombre, nombre_publico, correo, info, fecha, reservacion, aceptacion
        });
        res.status(201).json({ message: 'Reservación agregada correctamente', id: newReservation.id, no_reservacion: newReservation.no_reservacion });
    } catch (error) {
        if (error.message === 'DUPLICATE_RESERVATION') {
            return res.status(409).json({ message: 'Ya existe una reservación con ese número' });
        }

        console.error('Error al agregar reservación:', error);
        res.status(500).json({ message: 'Error al agregar reservación' });
    }
};

const updateService = async (req, res) => {
    try {
        const { id } = req.params;
        const nuevosDatos = req.body;
        await updateServicio(id, nuevosDatos);
        res.status(200).json({ message: 'Servicio actualizada' });
    } catch (err) {
        console.log("Error al editar registro. ", err);
        res.status(500).json({ message: 'Error al actualizar' });
    }
};

const deleteService = async (req, res) => {
    try {
        const { id } = req.params;
        await deleteServicio(id);
        res.status(200).json({ message: 'Servicio eliminado' });
    } catch (err) {
        console.log("Error al eliminar: ", err);
        res.status(500).json({ message: 'Error al eliminar' });
    }
};

module.exports = {
    getAllServices,
    getService,
    addService,
    updateService,
    deleteService
}