//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//	goo.gl url shortener is licensed under a Creative Commons Attribution-Noncommercial-No Derivative Works 3.0 License.
//	License (http://creativecommons.org/licenses/by-nc-nd/3.0/)
//
//	You are free:
//		* to Share ? to copy, distribute and transmit the work
//
//	Under the following conditions:
//		* Attribution ? You must attribute the work in the manner specified by the author or licensor (but not in any way that suggests that they endorse you or your use of the work).
//		* Noncommercial ? You may not use this work for commercial purposes.
//		* No Derivative Works ? You may not alter, transform, or build upon this work.
//
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 
var getAuthToken = function (b) 
{
	function c() 
	{
		for (var l = 0, m = 0; m < arguments.length; m++) 
		{
			l = l + arguments[m] & 4294967295;
		}
		
		return l
	}
	
	function d(l) 
	{
		l = l = String(l > 0 ? l : l + 4294967296);
		var m;
		m = l;
		for (var o = 0, n = false, p = m.length - 1; p >= 0; --p)
		{
			var q = Number(m.charAt(p));
			if (n) 
			{
				q *= 2;
				o += Math.floor(q / 10) + q % 10
			} 
			else
			{
				o += q;
			}
			n = !n
		}
		m = m = o % 10;
		o = 0;
		if (m != 0) 
		{
			o = 10 - m;
			if (l.length % 2 == 1) 
			{
				if (o % 2 == 1) o += 9;
				o /= 2
			}
		}
		m = String(o);
		m += l;
		return l = m
	}
	
	function e(l)
	{
		for (var m = 5381, o = 0; o < l.length; o++) 
		{
			m = c(m << 5, m, l.charCodeAt(o));
		}
			
		return m
	}
	
	function f(l) 
	{
		for (var m = 0, o = 0; o < l.length; o++) 
		{
			m = c(l.charCodeAt(o), m << 6, m << 16, -m);
		}
			
		return m
	}
	
	var h = {
		byteArray_: b,
		charCodeAt: function (l) 
		{
			return this.byteArray_[l]
		}
	};
	
	h.length = h.byteArray_.length;
	var i = e(h.byteArray_);
	i = i >> 2 & 1073741823;
	i = i >> 4 & 67108800 | i & 63;
	i = i >> 4 & 4193280 | i & 1023;
	i = i >> 4 & 245760 | i & 16383;
	var j = "7";
	h = f(h.byteArray_);
	var k = (i >> 2 & 15) << 4 | h & 15;
	k |= (i >> 6 & 15) << 12 | (h >> 8 & 15) << 8;
	k |= (i >> 10 & 15) << 20 | (h >> 16 & 15) << 16;
	k |= (i >> 14 & 15) << 28 | (h >> 24 & 15) << 24;
	j += d(k);
	return j;
	return i
};	