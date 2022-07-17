async function getAllTableRecords(route) {
  try {
    const endpoint = `http://localhost:5000/${route}`;
    const options = {
      method: 'GET',
      credentials: 'include',
    }

    const response = await fetch(endpoint, options);
    const data = await response.json();

    console.log(data);
    
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function getTableRecordById(route, id) {
  try {
    const endpoint = `http://localhost:5000/${route}/${id}`;
    const options = {
      method: 'GET',
      credentials: 'include',
    }

    const response = await fetch(endpoint, options);
    const data = await response.json();

    console.log(data);
    
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function insertTableRecord(route, body) {
  try {
    const endpoint = `http://localhost:5000/${route}`;
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      credentials: 'include',
    }

    const response = await fetch(endpoint, options);
    const data = await response.json();

    console.log(data);

    return data;
  } catch (error) {
    console.log(error);
  }
}

async function updateTableRecordById(route, id, body) {
  try {
    const endpoint = `http://localhost:5000/${route}/${id}`;
    const options = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      credentials: 'include',
    }

    const response = await fetch(endpoint, options);
    const data = await response.json();

    console.log(data);

    return data;
  } catch (error) {
    console.log(error);
  }
}

async function deleteTableRecordById(route, id) {
  try {
    const endpoint = `http://localhost:5000/${route}/${id}`;
    const options = {
      method: 'DELETE',
      credentials: 'include',
    }

    const response = await fetch(endpoint, options);
    const data = await response.json();

    console.log(data);

    return data;
  } catch (error) {
    console.log(error);
  }
}

export {
  getAllTableRecords,
  getTableRecordById,
  insertTableRecord,
  updateTableRecordById,
  deleteTableRecordById,
};
