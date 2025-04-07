const getData = async (client, req, res) => {
  try {
    if (client._connected) {
      console.log('Client is already connected');
    } else {
      await client.connect();
    }

    const result = await client.query("SELECT * FROM ai_tools");
    if (result.rows.length > 0) {
      return res.json(result.rows);
    } else {
      console.log("データが見つかりませんでした...。404")
      return res
        .status(404)
        .json({ message: "データが見つかりませんでした。" });
    }
  } catch (err) {
    console.log("データが見つかりませんでした...。500")
    return res.status(500).json({ error: err.stack });
  } finally {
    await client.end();
  }
};

export default getData;
