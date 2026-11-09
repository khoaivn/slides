# Vn Computer Modern Sans Serif web fonts

Locally bundled WOFF2 conversions of VNTeX's `vnss10`, `vnssbx10`, and
`vnssi10` Type 1 outlines, by Han The Thanh (2002–2005).
The converted family is named Vn Computer Modern Sans Serif; PostScript names
are VnCMSansWeb-Regular, VnCMSansWeb-Bold, and VnCMSansWeb-Italic.
Unicode mappings are derived from Adobe glyph names, including Vietnamese.
Original outlines are preserved. License: LPPL 1.3 or later (see LPPL.txt).

To rebuild with a TeX Live 2024 installation, install Python fonttools and
brotli, then run `python build-fonts.py`. Adjust the TeX Live path if needed.

The CSONET deck uses these fonts for prose. Mathematics uses the existing
bundled KaTeX fonts, derived from Computer Modern, with KaTeX's original
Roman, Math Italic, symbol and extensible delimiter metrics. These are not
binary copies of the TeX CMR/CMMI/CMSY/CMEX Type 1 fonts.
