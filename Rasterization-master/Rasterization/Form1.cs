using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Rasterization
{
    public partial class Form1 : Form
    {
        Bitmap bmp;
        Graphics grp;
        Point p1;
        Point p2;
        Button whichP;
        Point penPoint;
        int pointSize = 4;

        public Form1()
        {
            InitializeComponent();
            bmp = new Bitmap(pictureBox1.Width, pictureBox1.Height);
            grp = Graphics.FromImage(bmp);
        }

        private void drawLine()
        {
            int x1 = 0, x2 = 0, y1 = 0, y2 = 0;
            if (p1.X <= p2.X)
            {
                x1 = p1.X;
                x2 = p2.X;
                y1 = p1.Y;
                y2 = p2.Y;
            }
            else
            {
                x1 = p2.X;
                x2 = p1.X;
                y1 = p2.Y;
                y2 = p1.Y;
            }
            float dy = y2 - y1;
            float dx = x2 - x1;
            float m = dy / dx;
            float y = y1;
            for (int x = x1; x <= x2; ++x)
            {
                bmp.SetPixel(x, (int)Math.Round(y), Color.Black);
                y += m;
            }
        }

        private void drawAntiAliasedLine()
        {
            int x1 = 0, x2 = 0, y1 = 0, y2 = 0;
            if (p1.X <= p2.X)
            {
                x1 = p1.X;
                x2 = p2.X;
                y1 = p1.Y;
                y2 = p2.Y;
            }
            else
            {
                x1 = p2.X;
                x2 = p1.X;
                y1 = p2.Y;
                y2 = p1.Y;
            }

            byte lineColor = 0;
            byte bgColor = 255;

            float dy = y2 - y1;
            float dx = x2 - x1;
            float m = dy / dx;
            float y = y1;

            for (int x = x1; x <= x2; ++x)
            {
                byte c1 = (byte)(lineColor * (1 - Modf(y)) + bgColor * Modf(y));
                byte c2 = (byte)(lineColor * Modf(y) + bgColor * (1 - Modf(y)));

                bmp.SetPixel(x, (int)Math.Floor(y), Color.FromArgb(255, c1, c1, c1));
                bmp.SetPixel(x, (int)Math.Floor(y) + 1, Color.FromArgb(255, c2, c2, c2));

                y += m;
            }
            /*
            if (Math.Abs(y1 - y2) < Math.Abs(x1 - x2))
            {
                float y = y1;
                float m = Math.Abs((float)(y2 - y1) / (float)(x2 - x1));
                for (int x = x1; x <= x2; ++x)
                {
                    double c1Fraction = Math.Abs(y - Math.Floor(y));
                    double c2Fraction = 1.0 - c1Fraction;
                    int c1 = (int)(255 - 255 * c1Fraction);
                    int c2 = (int)(255 - 255 * c2Fraction);

                    if (y1 < y2)
                    {
                        bmp.SetPixel(x, (int)Math.Floor(y), Color.FromArgb(255, c1, c1, c1));
                        bmp.SetPixel(x, (int)Math.Ceiling(y), Color.FromArgb(255, c2, c2, c2));
                    }
                    if (y1 > y2)
                    {
                        bmp.SetPixel(x, y1 - ((int)Math.Floor(y) - y1), Color.FromArgb(255, c1, c1, c1));
                        bmp.SetPixel(x, y1 - ((int)Math.Ceiling(y) - y1), Color.FromArgb(255, c2, c2, c2));
                    }

                    y += m;
                }
            }
            else
            {
                float x = x1;
                float m = Math.Abs((float)(x2 - x1) / (float)(y2 - y1));
                for (int y = y1; y <= y2; ++y)
                {
                    double c1Fraction = Math.Abs(x - Math.Floor(x));
                    double c2Fraction = 1.0 - c1Fraction;
                    int c1 = (int)(255 - 255 * c1Fraction);
                    int c2 = (int)(255 - 255 * c2Fraction);
                    if (y1 < y2)
                    {
                        bmp.SetPixel((int)Math.Floor(x), y, Color.FromArgb(255, c1, c1, c1));
                        bmp.SetPixel((int)Math.Ceiling(x), y, Color.FromArgb(255, c2, c2, c2));
                    }
                    if (y1 > y2)
                    {
                        bmp.SetPixel(x1 - ((int)Math.Floor(x) - x2), y, Color.FromArgb(255, c1, c1, c1));
                        bmp.SetPixel(x1 - ((int)Math.Ceiling(x) - x2), y, Color.FromArgb(255, c2, c2, c2));
                    }

                    x += m;
                }
            }
            */
        }

        private void DrawAntiAliasedCircle()
        {
            int R = (int)Math.Sqrt((p1.X - p2.X) * (p1.X - p2.X) + (p1.Y - p2.Y) * (p1.Y - p2.Y));

            int lineColor = 0;
            int bgColor = 255;

            int x = R;
            int y = 0;

            try { bmp.SetPixel(p1.X + R, p1.Y, Color.Black); } catch { }
            try { bmp.SetPixel(p1.X - R, p1.Y, Color.Black); } catch { }
            try { bmp.SetPixel(p1.X, p1.Y + R, Color.Black); } catch { }
            try { bmp.SetPixel(p1.X, p1.Y - R, Color.Black); } catch { }

            while ( x > y)
            {
                ++y;
                double x_real = Math.Sqrt(R * R - y * y);
                x = (int)Math.Ceiling(x_real);
                double error = x - x_real;

                int color_r = (int)(lineColor * (1 - error) + bgColor * error);
                int color_l = (int)(lineColor * error + bgColor * (1 - error));

                var colorR = Color.FromArgb(255, color_r, color_r, color_r);
                var colorL = Color.FromArgb(255, color_l, color_l, color_l);

                try { bmp.SetPixel(p1.X + x, p1.Y + y, colorR); } catch { }
                try { bmp.SetPixel(p1.X + x - 1, p1.Y + y, colorL); } catch { }

                try { bmp.SetPixel(p1.X + x, p1.Y - y, colorR); } catch { }
                try { bmp.SetPixel(p1.X + x - 1, p1.Y - y, colorL); } catch { }

                try { bmp.SetPixel(p1.X - x, p1.Y + y, colorL); } catch { }
                try { bmp.SetPixel(p1.X - x - 1, p1.Y + y, colorR); } catch { }

                try { bmp.SetPixel(p1.X - x, p1.Y - y, colorL); } catch { }
                try { bmp.SetPixel(p1.X - x - 1, p1.Y - y, colorR); } catch { }

                try { bmp.SetPixel(p1.X + y, p1.Y + x, colorR); } catch { }
                try { bmp.SetPixel(p1.X + y - 1, p1.Y + x, colorL); } catch { }

                try { bmp.SetPixel(p1.X - y, p1.Y + x, colorL); } catch { }
                try { bmp.SetPixel(p1.X - y - 1, p1.Y + x, colorR); } catch { }

                try { bmp.SetPixel(p1.X + y, p1.Y - x, colorR); } catch { }
                try { bmp.SetPixel(p1.X + y - 1, p1.Y - x, colorL); } catch { }

                try { bmp.SetPixel(p1.X - y, p1.Y - x, colorL); } catch { }
                try { bmp.SetPixel(p1.X - y - 1, p1.Y - x, colorR); } catch { }
                
            }
        }
        
        private double Modf(double y)
        {
            return y - Math.Truncate(y);
        }

        private void drawCircle()
        {
            int R = (int)Math.Sqrt((p1.X - p2.X) * (p1.X - p2.X) + (p1.Y - p2.Y) * (p1.Y - p2.Y));

            int dE = 3;
            int dSE = 5 - 2 * R;
            int d = 1 - R;
            int x = 0;
            int y = R;

            try { bmp.SetPixel(p1.X + R, p1.Y, Color.Black); } catch { }
            try { bmp.SetPixel(p1.X - R, p1.Y, Color.Black); } catch { }
            try { bmp.SetPixel(p1.X, p1.Y + R, Color.Black); } catch { }
            try { bmp.SetPixel(p1.X, p1.Y - R, Color.Black); } catch { }

            while (y > x)
            {
                //move to E
                if (d < 0)
                {
                    d += dE;
                    dE += 2;
                    dSE += 2;
                }
                //move to SE
                else
                {
                    d += dSE;
                    dE += 2;
                    dSE += 4;
                    --y;
                }
                ++x;

                try { bmp.SetPixel(p1.X + x, p1.Y + y, Color.Black); } catch { }
                try { bmp.SetPixel(p1.X + y, p1.Y + x, Color.Black); } catch { }
                try { bmp.SetPixel(p1.X + y, p1.Y - x, Color.Black); } catch { }
                try { bmp.SetPixel(p1.X + x, p1.Y - y, Color.Black); } catch { }
                try { bmp.SetPixel(p1.X - x, p1.Y - y, Color.Black); } catch { }
                try { bmp.SetPixel(p1.X - y, p1.Y - x, Color.Black); } catch { }
                try { bmp.SetPixel(p1.X - y, p1.Y + x, Color.Black); } catch { }
                try { bmp.SetPixel(p1.X - x, p1.Y + y, Color.Black); } catch { }
            }
        }

        private void pictureBox1_Paint(object sender, PaintEventArgs e)
        {
            pictureBox1.Image = bmp;
        }

        public void SetPixel(SolidBrush brush, Graphics grp, int x, int y, Color color)
        {
            brush.Color = color;
            grp.FillRectangle(brush, x, y, 2, 2);
        }
        
        private void pictureBox1_MouseClick(object sender, MouseEventArgs e)
        {
            if (e.Button == MouseButtons.Left)
            {
                if (whichP == button1)
                {
                    grp.DrawEllipse(Pens.White, p1.X - pointSize / 2, p1.Y - pointSize / 2, pointSize, pointSize);
                    grp.FillEllipse(new SolidBrush(Color.White), p1.X - pointSize / 2, p1.Y - pointSize / 2, pointSize, pointSize);
                    p1 = new Point(e.X, e.Y);
                    grp.DrawEllipse(Pens.Red, p1.X - pointSize / 2, p1.Y - pointSize / 2, pointSize, pointSize);
                    grp.FillEllipse(new SolidBrush(Color.Red), p1.X - pointSize / 2, p1.Y - pointSize / 2, pointSize, pointSize);
                }
                else if (whichP == button2)
                {
                    grp.DrawEllipse(Pens.White, p2.X - pointSize / 2, p2.Y - pointSize / 2, pointSize, pointSize);
                    grp.FillEllipse(new SolidBrush(Color.White), p2.X - pointSize / 2, p2.Y - pointSize / 2, pointSize, pointSize);
                    p2 = new Point(e.X, e.Y);
                    grp.DrawEllipse(Pens.Red, p2.X - pointSize / 2, p2.Y - pointSize / 2, pointSize, pointSize);
                    grp.FillEllipse(new SolidBrush(Color.Red), p2.X - pointSize / 2, p2.Y - pointSize / 2, pointSize, pointSize);
                }
            }
        }

        private void clearButton_Click(object sender, EventArgs e)
        {
            bmp = new Bitmap(pictureBox1.Width, pictureBox1.Height);
            grp = Graphics.FromImage(bmp);
            button1.BackColor = Color.Silver;
            button2.BackColor = Color.Silver;

            p1 = new Point();
            p2 = new Point();
            whichP = null;
        }

        private void applyButton_Click(object sender, EventArgs e)
        {
            if(LineButton.Checked)
            {
                if (checkBox1.Checked)
                {
                    drawAntiAliasedLine();
                } else
                {
                    drawLine();
                }
            }
            if (CircleButton.Checked)
            {
                if (checkBox1.Checked)
                {
                    DrawAntiAliasedCircle();
                }
                else
                {
                    drawCircle();
                }
            }

            p1 = new Point();
            p2 = new Point();
            whichP = null;

            button1.BackColor = Color.Silver;
            button2.BackColor = Color.Silver;
        }

        private void button1_Click(object sender, EventArgs e)
        {
            whichP = button1;
            button1.BackColor = Color.Red;

            if (p2.IsEmpty) button2.BackColor = Color.Silver;
            else button2.BackColor = Color.Blue;
        }

        private void button2_Click(object sender, EventArgs e)
        {
            whichP = button2;
            button2.BackColor = Color.Red;

            if (p1.IsEmpty) button1.BackColor = Color.Silver;
            else button1.BackColor = Color.Blue;
        }
        
        private void pictureBox1_MouseMove(object sender, MouseEventArgs e)
        {
            if (Control.MouseButtons == MouseButtons.Left && radioButton1.Checked)
            {
                var oldPoint = penPoint;
                penPoint = new Point(e.X, e.Y);

                p1 = oldPoint;
                p2 = penPoint;

                if (checkBox1.Checked)
                {
                    drawAntiAliasedLine();
                }
                else
                {
                    drawLine();
                }

                p1 = new Point();
                p2 = new Point();
                whichP = null;

                //grp.DrawLine(Pens.Black, oldPoint, penPoint);
            } else
            {
                penPoint = new Point(e.X, e.Y);
            }
        }
    }
}

