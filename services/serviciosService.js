const admin = require('firebase-admin');
const db = require('../config/firebaseConfig');
const collection = db.collection('formulario_servicio');

const getAllServicios = async () => {
    const snapshot = await collection.get();
    const datos = [];
    snapshot.forEach(doc => {
        datos.push({ id: doc.id, ...doc.data() });
    });
    return datos;
};

const getServicioId = async (no_servicio) => {
    const snapshot = await collection.where('no_servicio', '==', Number(no_servicio)).limit(1).get();

    if (snapshot.empty) return null;

    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() };
}

const createServicio = async (reservationData) => {
    const snapshot = await db.collection('formulario_servicio')
        .orderBy('no_servicio', 'desc')
        .limit(1)
        .get();

    let newNoServicio = 1;
    if (!snapshot.empty) {
        const lastDoc = snapshot.docs[0];
        const lastNo = lastDoc.data().no_Servicio;
        newNoServicio = lastNo + 1;
    }

    const finalReservationData = {
        ...reservationData,
        no_servicio: newNoServicio
    };

    const docRef = await db.collection('formulario_habitacion').add(finalReservationData);
    return { id: docRef.id, no_servicio: newNoServicio };
};

const updateServicio = async (no_servicio, nuevosDatos) => {
    const snapshot = await collection.where('no_servicio', '==', Number(no_servicio)).limit(1).get();

    if (snapshot.empty) {
        throw new Error('No se encontró la reservación con ese id');
    }

    const docRef = snapshot.docs[0].ref;
    await docRef.update(nuevosDatos);
};

const deleteServicio = async (no_reservacion) => {
    const snapshot = await collection.where('no_servicio', '==', Number(no_reservacion)).limit(1).get();

    if (snapshot.empty) {
        throw new Error('No se encontró la reservación con ese id');
    }

    const docRef = snapshot.docs[0].ref;
    await docRef.delete();
};

module.exports = {
    getAllServicios,
    getServicioId,
    createServicio,
    updateServicio,
    deleteServicio
}