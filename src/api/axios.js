import axios from 'axios';

const backendApi = axios.create({
 baseURL: 'https://coraqr-back2.onrender.com/api/',
});

backendApi.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  };
  return config;
});
const errorInterceptor = (err) => {
  const responseData = err.response.data;
  err.data = responseData;

  if (err.response.status === 403) {
    localStorage.clear();
    window.location.href = '/login';
  }
};

backendApi.interceptors.response.use(null, errorInterceptor);

async function login(form) {
  try {
    const response = await backendApi.post('auth/login', form);

    if (response) {
      const { data } = response;
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      return data;
    }

    return;
  } catch (error) {
    console.error('Login failed:', error);
    throw new Error('Login failed');
  }
}

async function postEvent(form) {
  try {
    const { data } = await backendApi.post('event', form);
    return data;
  } catch (error) {
    console.log(error);
    return {};
  }
}

async function getEvents(limit = 5, skip = 0, search) {
  try {
    const { data } = await backendApi.get(
      `event?limit=${limit}&skip=${skip}&name=${search}`,
    );

    return data;
  } catch (error) {
    console.log(error);
    return {};
  }
}

async function editEvent(id, form) {
  try {
    const { data } = await backendApi.put(`event/${id}`, form);
    return data;
  } catch (error) {
    console.log(error);
    return {};
  }
}

async function deleteEvent(id) {
  try {
    await backendApi.delete(`event/${id}`);
    return;
  } catch (error) {
    console.log(error);
    return {};
  }
}



async function createInvitation(participante) {
  try {
      await backendApi.post('invitation', participante);
  } catch (error) {
      console.error('Error al enviar la solicitud de invitación:', error);
      throw error; 
  }
}

async function sendInvitation(eventId, name, lastname, email) {
  try {
    // Construir el objeto de datos a enviar en el cuerpo de la solicitud
    const data = {
      event: eventId,
      name: name,
      lastname: lastname,
      email: email
    };

    // Realizar la solicitud PUT al servidor
    const response = await backendApi.post(`invitation`,data);
    console.log(response);
    return response.data; // Devolver los datos recibidos del servidor
  } catch (error) {
    // Manejar errores de solicitud
    console.error('Error al enviar la invitación:', error);
    throw new Error('Error al enviar la invitación.');
  }
}

async function createInvitationByExcel(id, form) {
  try {
    const { data } = await backendApi.post(`invitation/excel/${id}`, form);
    
    return data;
  } catch (error) {
    console.log(error);
    return {};
  }
}

async function getInvitation(
  id,
  limit,
  skip,
  searchName,
  searchEmail,
  searchState,
) {
  try {
    const { data } = await backendApi.get(
      `invitation/${id}?limit=${limit}&skip=${skip}&name=${searchName}&email=${searchEmail}&state=${searchState}`,
    );
    return data;
  } catch (error) {
    console.log(error);
    return {};
  }
}

async function putInvitation(form) {
  try {
    const { data } = await backendApi.put(`invitation`, form);
    return data;
  } catch (error) {
    console.log(error);
    return {};
  }
}

async function createUser(form) {
  try {
    const { data } = await backendApi.post('users', form);
    return data;
  } catch (error) {
    console.log(error);
    return {};
  }
}

async function getUsers(
  limit = 5,
  skip = 0,
  searchName,
  searchEmail,
  searchRole,
) {
  try {
    const { data } = await backendApi.get(
      `users?limit=${limit}&skip=${skip}&name=${searchName}&email=${searchEmail}&role=${searchRole}`,
    );
    return data;
  } catch (error) {
    console.log(error);
    return {};
  }
}

async function getUser(id) {
  try {
    const { data } = await backendApi.get(`users/${id}`);
    return data;
  } catch (error) {
    console.log(error);
    return {};
  }
}

async function editUser(id, form) {
  try {
    const { data } = await backendApi.put(`users/${id}`, form);
    return data;
  } catch (error) {
    console.log(error);
    return {};
  }
}

///
async function postEstablishment(form) {
  try {
    const { data } = await backendApi.post('establishment', form);
    return data;
  } catch (error) {
    console.log(error);
    return {};
  }
}

async function getEvstablishments(limit = 5, skip = 0, search) {
  try {
    const { data } = await backendApi.get(
      `establishment?limit=${limit}&skip=${skip}&name=${search}`,
    );

    return data;
  } catch (error) {
    console.log(error);
    return {};
  }
}

async function editEstablishment(id, form) {
  try {
    await backendApi.put(`establishment/${id}`, form);
    return;
  } catch (error) {
    console.log(error);
    return {};
  }
}

async function deleteEstablishment(id) {
  try {
    await backendApi.delete(`establishment/${id}`);
    return;
  } catch (error) {
    console.log(error);
    return {};
  }
}

export {
  backendApi,
  login,
  postEvent,
  getEvents,
  editEvent,
  deleteEvent,
  createInvitation,
  createInvitationByExcel,
  getInvitation,
  putInvitation,
  createUser,
  getUsers,
  getUser,
  editUser,
  postEstablishment,
  getEvstablishments,
  editEstablishment,
  deleteEstablishment,
  sendInvitation
};
