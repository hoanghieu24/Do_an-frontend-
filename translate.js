// translate.js
import fs from "fs-extra";
import pkg from "@vitalets/google-translate-api";
const { translate } = pkg;

const sourceFile = "./src/locales/vi.json"; // file gốc tiếng Việt
const targetFile = "./src/locales/en.json"; // file đích muốn tạo
const targetLang = "en"; // đổi sang 'ko' nếu muốn dịch sang tiếng Hàn

async function translateObject(obj) {
  const result = {};
  for (const key in obj) {
    if (typeof obj[key] === "object") {
      result[key] = await translateObject(obj[key]);
    } else {
      const text = obj[key];
      try {
        const res = await translate(text, {
          to: targetLang,
          fetchOptions: {
            headers: { "User-Agent": "Mozilla/5.0" },
          },
        });
        result[key] = res.text;
        console.log(`✅ ${text} → ${res.text}`);
      } catch (err) {
        console.error(`❌ Lỗi dịch "${text}":`, err.message);
        result[key] = text;
      }

      // delay 200–300ms tránh bị Google chặn
      await new Promise((resolve) => setTimeout(resolve, 250));
    }
  }
  return result;
}

(async () => {
  const vi = await fs.readJson(sourceFile);
  const en = await translateObject(vi);
  await fs.writeJson(targetFile, en, { spaces: 2 });
  console.log("🎉 Đã dịch xong! File tạo tại:", targetFile);
})();
